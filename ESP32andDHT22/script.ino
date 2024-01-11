// Libraries
#include <DHT22.h>

// Define pin data
#define pinDATA 14 // SDA, or almost any other I/O pin

DHT22 dht22(pinDATA); 
 
void setup() {
  Serial.begin(115200); 
  Serial.println("\nESP32+DTH22 Temperature + Humidity test");
}

void loop() {
  float humidity = dht22.getHumidity();
  float temperature = dht22.getTemperature();

  String data = "{";
  data += "\"humidity\":" + String(humidity, 1) + ",";
  data += "\"temperature\":" + String(temperature, 1);
  data += "}";
  
  Serial.println(data);
  delay(2000); //Collecting period should be : >1.7 second
}
