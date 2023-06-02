#ifndef HTTP_H
#define HTTP_H

const char* wifiSsid = "SSID";      // your network SSID (name of wifi network)
const char* wifiPassword = "PASS";    // your network password

const char* platformUsername = "IoTGrupa9";
const char* platformPassword = "IoTProject123";
const char* contentType = "application/vnd.ericsson.simple.input.hierarchical+json;version=1.0";
const char* parkingSpotRegistrationURL = "https://161.53.19.19:56443/m2m/data";

void connectToWiFi(const char* ssid, const char* password);

void postData(String data);

void registerParkingSpot();

void storeParkingSpotStatus(int status);

#endif