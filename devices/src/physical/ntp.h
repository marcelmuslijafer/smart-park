#ifndef NTP_H
#define NTP_H

#define TIMEZONE 2 * 3600

const char* ntpServer = "pool.ntp.org";

unsigned long long getTime();

#endif