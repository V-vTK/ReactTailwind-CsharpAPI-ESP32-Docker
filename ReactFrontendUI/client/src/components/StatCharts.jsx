import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import React, { useState, useEffect } from 'react';

const StatCharts = ({data}) => {
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  useEffect(() => {
  if (data && data.length > 0) {
    const temperatureData = data.map(entry => entry.temperature);
    const humidityData = data.map(entry => entry.humidity);
    setTemperature(temperatureData);
    setHumidity(humidityData);
  } else {
    console.log(data, "no data received yet")
  }
  }, [data]);

  const humidityData = {
    ...chartConfig,
    series: [
      {
        name: "Humidity",
        data: humidity, 
      },
    ],options: {
      ...chartConfig.options,
      colors: ["#4682B4"],
    }
  };

  const temperatureData = {
    ...chartConfig,
    series: [
      {
        name: "Temperature",
        data: temperature, 
      },
    ], options: {
      ...chartConfig.options,
      colors: ["#cc0000"],
    }
  };

  return (
    <div className="flex flex-row items-center">
      <Card className="m-6" >
        <CardHeader color="transparent" floated={false} shadow={false}>
          <Typography variant="h6" color="blue-gray">
          Humidity Graph %
          </Typography>
          <CardBody className="px-2 pb-0">
            <Chart {...humidityData} />
          </CardBody>
        </CardHeader>
      </Card>
      <Card className="m-6">
        <CardHeader color="transparent" floated={false} shadow={false}>
          <Typography variant="h6" color="blue-gray">
          Temperature Graph %
          </Typography>
          <CardBody className="px-2 pb-0">
            <Chart {...temperatureData} />
          </CardBody>
        </CardHeader>
      </Card>
    </div>
  );
}

const chartConfig = {
  type: "line",
  height: 440,
  series: [
    {
      name: "example",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};


export default StatCharts;


