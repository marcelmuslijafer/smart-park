#ifndef PROXIMITY_SENSOR_H
#define PROXIMITY_SENSOR_H

#define TRIG_PIN  5
#define ECHO_PIN  18

#define MINIMAL_PROXIMITY 30.0

//define sound speed in cm/uS
#define SOUND_SPEED 0.034

void initProximitySensor();

float readDistance();

int isParkingSpotFree();

#endif