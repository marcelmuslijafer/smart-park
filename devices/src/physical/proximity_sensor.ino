#include "proximity_sensor.h"

void initProximitySensor() {
  pinMode(TRIG_PIN, OUTPUT);  // Sets the trigPin as an Output
  pinMode(ECHO_PIN, INPUT);   // Sets the echoPin as an Input
}

float readDistance() {
  // Clears the trigPin
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  long duration = pulseIn(ECHO_PIN, HIGH);

  // Calculate the distance
  float distance = duration * SOUND_SPEED / 2;

  return distance;
}

bool isParkingSpotFree()
{
  bool free = readDistance() > MINIMAL_PROXIMITY ? true : false;

  delay(1000);

  if (!free && readDistance() < MINIMAL_PROXIMITY)
    return false;

  return true;
}