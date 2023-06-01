#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "http.h"
#include "ntp.h"

void connectToWiFi(const char* ssid, const char* password) {
  WiFi.begin(ssid, password);

  // attempt to connect to Wifi network:
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    // wait 1 second for re-trying
    delay(1000);
  }

  Serial.print("Connected to ");
  Serial.println(ssid);
}

void postData(String data) {
  WiFiClientSecure wifi;
  HTTPClient http;

  Serial.println(data);

  wifi.setInsecure();
  http.begin(wifi, parkingSpotRegistrationURL);

  http.addHeader("Content-Type", contentType);
  http.setAuthorization(platformUsername, platformPassword);
  int response = http.POST(data);

  Serial.print("Response: ");
  Serial.println(response);

  http.end();
}

void registerParkingSpot() {
  StaticJsonDocument<200> doc;

  // Set deviceId
  doc["deviceId"] = "Grupa9GatewayGroup1";

  doc["header"]["timeStamp"] = getTime();

  doc["body"]["Grupa9UltrazvucniSenzor1"]["Grupa9Latitude"] = 45.800935;
  doc["body"]["Grupa9UltrazvucniSenzor1"]["Grupa9Longitude"] =  15.970574;
  doc["body"]["Grupa9UltrazvucniSenzor1"]["Grupa9ForDisabled"] = 0;

  String serializedData;
  serializeJson(doc, serializedData);

  postData(serializedData);
}

void storeParkingSpotStatus(int status) {
  StaticJsonDocument<200> doc;

  doc["deviceId"] = "Grupa9GatewayGroup1";
  doc["header"]["timeStamp"] = getTime();
  doc["body"]["Grupa9UltrazvucniSenzor1"]["Grupa9Status"] = status;

  String serializedData;
  serializeJson(doc, serializedData);

  postData(serializedData);
}