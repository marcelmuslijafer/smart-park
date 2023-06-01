#include "http.h"
#include "proximity_sensor.h"
#include "led.h"
#include "ntp.h"

#define PROXIMITY_THRESHOLD 30.0

void setup() {
  Serial.begin(115200);      // Starts the serial communication
  //initProximitySensor();
  //initLeds();
  connectToWiFi(wifiSsid, wifiPassword); // set wifi data in http.h
  configTime(0, 0, ntpServer);
  registerParkingSpot();
}

void loop() {
  float distance = readDistance();

  if (distance < PROXIMITY_THRESHOLD) {
    turnLedOff(GREEN_LED);
    turnLedOn(RED_LED);
  } else {
    turnLedOff(RED_LED);
    turnLedOn(GREEN_LED);
  }
  delay(100);
}