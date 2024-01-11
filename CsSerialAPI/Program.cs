using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text.Json;

namespace CsSerialAPI
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Starting: ");
            var pocketBaseUrl = "http://pocketbase:8090";
            var pocketApiClient = new PocketApiClient(pocketBaseUrl);
            string portName = "/dev/ttyUSB0";
            int baudRate = 115200;
            int readTimeout = 1000; // Time out can be enabled
            SerialPortReader portReader = new SerialPortReader(portName, baudRate, readTimeout);

            while (true)
            {
                await LoopedFuncAsync(portReader, pocketApiClient);
                await Task.Delay(TimeSpan.FromSeconds(10)); //iteration time in seconds
            }
        }

        static async Task LoopedFuncAsync(SerialPortReader portReader, PocketApiClient pocketApiClient)
        {
            List<string> receivedLines = await Task.Run(() =>
            {
                return portReader.ReadMultipleLines(13);
            });

            if (receivedLines != null)
            {
                foreach (string line in receivedLines)
                {
                    SensorData weatherData = JsonConvert.DeserializeObject<SensorData>(line);

                    double humidity = weatherData.Humidity;
                    double temperature = weatherData.Temperature;
                    bool success = await pocketApiClient.CreateDHT22Record(temperature, humidity);
                    if (!success) {
                        Console.WriteLine("DB error -> DB not connected");
                    }
                }
            }
        }
    }
}




