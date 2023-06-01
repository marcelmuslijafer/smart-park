#ifndef HTTP_H
#define HTTP_H

const char* ssid = "WIFI_SSID";          // your network SSID (name of wifi network)
const char* password = "WIFI_PASSWORD";    // your network password

void connectToWiFi(const char* ssid, const char* password);

#endif