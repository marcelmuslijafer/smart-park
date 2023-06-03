#ifndef MQTT_H
#define MQTT_H

const char* mqttServer = "161.53.19.19";
const int mqttPort = 56883;
const char* mqttTopic = "grupa9/senzor7/reserve";

void mqttCallback(char*, byte*, unsigned int);

void connectToMqttBroker();

String getMqttMessage();

#endif