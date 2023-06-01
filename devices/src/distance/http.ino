#include <WiFi.h>
#include <HTTPClient.h>
#include "http.h"

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