#include <WiFi.h>
#include <PubSubClient.h>

#include "mqtt.h"

String receivedPayload;

void mqttCallback(char* topic, byte* payload, unsigned int length)
{
  receivedPayload = "";
  Serial.print("Received message on topic:");
  Serial.println(topic);

  Serial.print("Message: ");

  for (int i = 0; i < length; i++)
  {
    Serial.print((char) payload[i]);
    receivedPayload += (char) payload[i];
  }

  Serial.println();
}

WiFiClient wifiClient;
PubSubClient client(wifiClient);

void connectToMqttBroker()
{
  client.setServer(mqttServer, mqttPort);
  client.setCallback(mqttCallback);

  while (!client.connected())
  {
    if  (client.connect("ArduinoClient"))
    {
      Serial.println("Connected to MQTT broker");
      client.subscribe(mqttTopic);
      Serial.println("Subscroded.");
    }
    else
    {
      Serial.println("Failed to connect to MQTT broker, retrying in 5 seconds.");
      delay(5000);
    }
  }
}

String getMqttMessage()
{
  client.loop();
  return receivedPayload;
}