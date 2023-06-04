#include "led.h"

void initLeds() {
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
}

void turnLedOn(int led) {
  digitalWrite(led, HIGH);
}

void turnLedOff(int led) {
  digitalWrite(led, LOW);
}

void switchLedStatus(int led) {
  digitalWrite(led, !digitalRead(led));
}

void ledBlink(int led)
{
  turnLedOn(led);
  delay(BLINK_DELAY);
  turnLedOff(led);
}
