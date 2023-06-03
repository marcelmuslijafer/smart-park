#include "http.h"
#include "proximity_sensor.h"
#include "led.h"
#include "ntp.h"
#include "mqtt.h"

void setup() 
{
  Serial.begin(115200);      // Starts the serial communication
  initProximitySensor();
  initLeds();
  connectToWiFi(wifiSsid, wifiPassword); // set wifi data in http.h
  configTime(0, 0, ntpServer);
  registerParkingSpot();
  storeParkingSpotStatus(SPOT_FREE);
  connectToMqttBroker();
}

bool previousSpotFree = true;
bool sentReserved = false;
void loop() 
{
  String mqttMessage = getMqttMessage();
  bool currentSpotFree = isParkingSpotFree();

  if (!currentSpotFree)
  {
    turnLedOff(GREEN_LED);
    turnLedOn(RED_LED);

    if (currentSpotFree != previousSpotFree)
    {
      storeParkingSpotStatus(SPOT_TAKEN);
      previousSpotFree = currentSpotFree;
    }
  }
  else
  {
    if (mqttMessage == "2" && !sentReserved)
    {
      turnLedOff(GREEN_LED);
      ledBlink(RED_LED);
      storeParkingSpotStatus(SPOT_RESERVED);
      sentReserved = true;
    } 
    else if (mqttMessage == "2")
    {
      turnLedOff(GREEN_LED);
      ledBlink(RED_LED);
    }
    else
    {
      if (currentSpotFree)
      {
        turnLedOff(RED_LED);
        turnLedOn(GREEN_LED);

        if (currentSpotFree != previousSpotFree)
        {
          storeParkingSpotStatus(SPOT_FREE);
          previousSpotFree = currentSpotFree;
        }

        sentReserved = false;
      }
    }
  }

  delay(100);

}