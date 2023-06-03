#include <time.h>

unsigned long long getTime() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return -1;
  }
  time(&now);
  return now;
}