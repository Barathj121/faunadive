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

unsigned char id = 0x0f;
RHMesh rm(rf95, id);

char buf[255];
unsigned char len;
/*
struct BuoyData {
  unsigned char id;
  float temp;
  float lat;
  float lon;
};

BuoyData bd;

char msgbuf[512];
char msgfmt[] = "{ \"id\": %hhu,\"temp\": %f, \"location\": { \"lat\": %f, \"long\": %f } }";

void bd_to_str(char *msgbuf, BuoyData *bd) {
  sprintf(msgbuf, msgfmt, bd->id, bd->temp, bd->lat, bd->lon);
}
*/

void setup() {

  Serial.begin(115200);

  spi.begin();

  if (!rf95.init()) {
    Serial.println("MSG Could not init RF95");
    while (1) { 
      delay(1000);
    }
  }

  if (!rm.init()) {
    Serial.println("MSG Could not init RHD");
    while (1) {
      delay(1000);
    }
  }

  Serial.print("MSG id: ");
  Serial.println(id);

  Serial.println("MSG Init complete!!");
}

void readline(char *msgbuf, int len) {
  int cur = 0;
  while (Serial.available() && cur < len-1) {
    msgbuf[cur] = Serial.read();
    cur++;
  }
  msgbuf[cur] = '\0';
}

void loop() {
  //Serial.println("doing somming");
  //len = sizeof(bd);
  len = sizeof(buf);
  unsigned char from;
  if (rm.recvfromAckTimeout((unsigned char*)buf, &len, 2000, &from, NULL, NULL, NULL, NULL)) {
    buf[len] = '\0';
    Serial.print("ALERT ");
    Serial.println(buf);
  } else {
    // Serial.println("Nothing to print");
  }
  if (Serial.available()) {
    readline(buf, sizeof(buf));
    if (rm.sendtoWait((unsigned char*)buf, strlen(buf), 0xff) == RH_ROUTER_ERROR_NONE) {
      Serial.println("STATUS SENT");
    } else {
      Serial.println("STATUS FAIL");
    }
  }
}
