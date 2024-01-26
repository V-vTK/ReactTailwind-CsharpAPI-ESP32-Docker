
const StatCards = ({data}) => {
    return (
      <div className="flex flex-row justify-center">
        <pre className="border border-gray-300 rounded-md p-6 m-4 flex flex-wrap w-1/4 min-w-min">
        {data && data.length > 0 ? (
            data
            .slice()
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .map(item => (
                <div key={item.id} className="border border-gray-300 rounded-md p-2 m-2 flex-grow min-w-min">
                <p>Date: {item.time}</p>
                <p>Humidity: {item.humidity} %</p>
                </div>
            ))
            ) : (
            <p>No data available.</p>
        )}
        </pre>
        <pre className="border border-gray-300 rounded-md p-6 m-4 flex flex-wrap w-1/4 min-w-min">
        {data && data.length > 0 ? (
            data
            .slice() 
            .sort((a, b) => new Date(b.time) - new Date(a.time)) 
            .map(item => (
                <div key={item.id} className="border border-gray-300 rounded-md p-2 m-2 flex-grow min-w-min">
                <p>Date: {item.time}</p>
                <p>Temperature: {item.temperature} °C</p>
                </div>
            ))
            ) : (
            <p>No data available.</p>
        )}
        </pre>
      </div>
    )



}
export default StatCards;