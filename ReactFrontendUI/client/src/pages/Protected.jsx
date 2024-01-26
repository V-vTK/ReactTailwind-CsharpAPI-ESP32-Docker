import React, { useState, useEffect } from "react";

import { usePocket } from "../contexts/PocketContext";
import { TopNav } from "../components/TopNav";
import AverageStat from "../components/AverageStat";
import StatCards from "../components/StatCards";
import StatCharts from "../components/StatCharts";
import { SwitchWithDescription } from "../components/SwitchWithDescription";


export const Protected = () => {
  const { logout, pb } = usePocket();
  const [data, setData] = useState(null);
  const [switchState, setSwitchState] = useState(false);

  const getDailyData = async () => {
    try {
      const { formattedToday, formattedTomorrow } = getDate(-3);
      console.log(formattedToday, "-", formattedTomorrow);
      const records = await pb.collection('DHT22').getList(1, 100, {requestKey: null,
        filter: `time >= "${formattedToday}" && time <= "${formattedTomorrow}"`,
      });
      console.log(records.items);
      setData(records.items);
    } catch (error) {
      console.log('Error occurred while fetching data', error);
    }
  }

  const getDate = (hourOffset) => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const tomorrow = String(currentDate.getDate()+1).padStart(2, '0');

    const hours = String(currentDate.getHours()+hourOffset).padStart(2, '0'); // Hours back to see old results
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const todayTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    const tomorrowTime = `${year}-${month}-${tomorrow} ${hours}:${minutes}:${seconds}`
    return { formattedToday: todayTime, formattedTomorrow: tomorrowTime };
  }

  // Realtime data fetching
  useEffect(() => {
    pb.collection('DHT22').subscribe('*', function (e) {
      if (e.action = "create") {
        console.log(e.record);
        filterAndAdd(e.record)
      }
    });
    return () => {
      pb.collection('DHT22').unsubscribe();
    };
  });


  const filterAndAdd = async (newData) => {
    const { formattedToday, formattedTomorrow } = getDate(0);
    const newDataDate = new Date(newData.time);

    const today = new Date(formattedToday);
    const tomorrow = new Date(formattedTomorrow);

    if (newData.time != "" && today < newDataDate && newDataDate < tomorrow) {
      setData([...data, newData]);
    } 
  }

  const handleSwitchChange = () => {
    setSwitchState(!switchState);
  };

  // Initial render
  useEffect(() => { 
    getDailyData();
  }, []);

  return (
    <>
    <TopNav></TopNav>
    <section className="flex flex-col items-center h-screen">
      <h2 className="text-2xl font-bold m-4 mt-16">ESP32 + DHT22 Sensor Statistics</h2>
      <div className="flex flex-row justify-center">
        <pre className="border border-gray-300 rounded-md p-6 m-4 flex flex-wrap">
          <div>Average Humidity: <AverageStat data={data} stat={"humidity"} sign={"%"}></AverageStat></div>    
        </pre>
        <pre className="border border-gray-300 rounded-md p-6 m-4 flex flex-wrap">
          <div>Average Temperature: <AverageStat data={data} stat={"temperature"} sign={"°C"}></AverageStat></div>
        </pre>
      </div>
      <SwitchWithDescription text={switchState} desc={"Switch between Graph and Card layout"} onChange={handleSwitchChange}></SwitchWithDescription>
      {switchState ? (
        <StatCards data={data}></StatCards>
      ) : (
        <StatCharts data={data}></StatCharts>
      )}
      <p>Your password is never stored in plaintext inside the database.</p>
      <button onClick={logout} className="text-md font-bold m-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Logout</button>
    </section>
    </>
  );
};
