using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CsSerialAPI
{
    public class PocketApiClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _pocketBaseUrl;

        public PocketApiClient(string baseUrl)
        {
            _pocketBaseUrl = baseUrl;
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri(_pocketBaseUrl);
        }

        public async Task<bool> CreateDHT22Record(double temperature, double humidity)
        {
            var currentTime = DateTime.Now;
            var data = new
            {
                time = currentTime,
                temperature = temperature,
                humidity = humidity
            };

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(data);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("/api/collections/DHT22/records", content);

            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Record created successfully!");
                return true;
            }
            else
            {
                Console.WriteLine("Failed to create record. Status code: " + response.StatusCode);
                return false;
            }
        }
    }

}