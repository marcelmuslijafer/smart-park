#ifndef LED_H
#define LED_H

#define GREEN_LED 21
#define RED_LED 19
#define BLINK_DELAY 300

void initLeds();

void turnLedOn(int led);

void turnLedOff(int led);

void switchLedStatus(int led);

void ledBlink(int led);

#endif