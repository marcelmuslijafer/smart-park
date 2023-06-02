#include <time.h>

unsigned long long getTime() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return -1;
  }
  time(&now);
  // Serial.print("Time &now: ");
  // Serial.print(now);
  // Serial.print("Time time(&now): ");
  // Serial.println(time(&now));
  return now;
}