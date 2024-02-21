#include <SPI.h>
#include <RH_RF95.h>
#include <RHMesh.h>
#include <RHHardwareSPI.h>

RHHardwareSPI spi;
RH_RF95 rf95;

/*
 * Plan:
 * 
 * 1. RHSoftwareSPI
 * 2. RH95
 * 3. RHDatagram
 * 4. sendTo(), dest RH_BROADCAST_ADDRESS
 * 5. if available(), parse, and print to serial
 * 6. :`) god pray ez
 */

unsigned char id = 0xf0;
float temp = 35.2;
float lat = 13.078679;
float lon = 80.313524;
float ntu = 28.7;
float o2 = 10.5;
float ph = 7.5;
float amm = 1.23;
float nit= 2.34;

RHMesh rm(rf95, id);

//char msg[] = "13.078679 80.313524";
// char msg[] = "14.078679 81.313524";
char msgbuf[255];
char msgfmt[] = "{\"id\":%hhu,\"type\":\"BUOY\",\"temp\":%f,\"ntu\":%f,\"o2\":%f,\"ph\":%f,\"amm\":%f,\"nit\":%f,\"location\": { \"lat\": %f, \"lon\": %f } }";

void setup() {


  Serial.begin(115200);

  spi.begin();

  if (!rf95.init()) {
    Serial.println("Could not init RF95");
    while (1) { 
      delay(1000);
    }
  }

  if (!rm.init()) {
    Serial.println("Could not init RHMesh");
    while (1) {
      delay(1000);
    }
  }

  Serial.print("id: ");
  Serial.println(id);
  Serial.println("type: sender");

  Serial.println("Init complete!!");
}

void loop() {
  sprintf(msgbuf, msgfmt, id, temp, ntu, o2, ph, amm, nit, lat, lon);
  if (rm.sendtoWait((unsigned char*)msgbuf, strlen(msgbuf), 0xff) == RH_ROUTER_ERROR_NONE) {
    Serial.print("Sent: ");
    Serial.println(msgbuf);
    Serial.print("size: ");
    Serial.println(strlen(msgbuf));
  } else {
    Serial.println("Could not send!");
  }
  unsigned char from;
  unsigned char len = sizeof(msgbuf);
  if (rm.recvfromAckTimeout((unsigned char*)&msgbuf, &len, 100, &from, NULL, NULL, NULL, NULL)) {
    msgbuf[len] = '\0';
    Serial.print("Received: ");
    Serial.println(msgbuf);
  }
  delay(2000);
}
