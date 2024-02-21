# Hardware Scripts and Programs

There are 4 places where hardware units used in this project:
1. Buoy Unit
2. Ship Unit
3. Coast Unit
4. LoRa transceiver for ship unit and coast unit

All communication uses a JSON format, for easy development and improvement in the 
future. For LoRa communication, [the RadioHead library](https://www.airspayce.com/mikem/arduino/RadioHead/)
has been used.

## Buoy Unit

This unit is present on the buoys, and is connected to various sensors to collect
data on the ocean, including temperature, turbidity, ammonia, nitrates and dissolved
oxygen. The data collected and the location of the buoy are sent via LoRa to be 
used for border alerts.

**Platform**: ESP32\
**Modules**:  SX-1278 LoRa module, Sensors\
**Code Files**: `mesh_recv/mesh_recv.ino`


## Ship Unit

This unit is present on the ship. It is connected to a LoRa transceiver, and to a
GPS module. It periodically sends its location via LoRa to the coast unit,
so that it is updated on the database.

**Platform**: Raspberry Pi\
**Modules**: GY-NEO6 GPS Module, LoRa transceiver\
**Code Files**: `ship_unit/alert.py`

## LoRa Transceiver

This is an auxiliary unit, used to interface between Raspberry Pi or other 
platforms and LoRa. It consists of an ESP32 with a LoRa module, and can enable
other devices to send and recv messages. It communicates with these devices over
USB Serial.

**Platform**: ESP32\
**Modules**: SX-1278 LoRa module\
**Code Files**: `mesh_send/mesh_send.ino`

## Coast Unit

The coast unit acts as a bridge between LoRa and the internet. Any LoRa datagrams 
received are updated in the corresponding Firebase collection. It makes use of a
LoRa transceiver unit.

**Platform**: any, tested using laptop and Raspberry Pi\
**Modules**: LoRa transceiver, internet connection\
**Code files**: `coast_unit\coast_unit.py`

Note: The coast unit requires firebase authentication, in the form of a `pyfirebasesdk.json`
file.
