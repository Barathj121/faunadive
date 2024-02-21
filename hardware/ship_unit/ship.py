import serial
import geopy.distance
import gpsd
import time
import json

gpsd.connect()

# Connections:
# RPI   GPS
# 5V    5V
# GND   GND
# 8     RX
# 10    TX

# Note: receiver ESP32 must be connected via USB

ser = serial.Serial('/dev/ttyUSB0', baudrate=115200, timeout=1)

self_loc = (13.079954, 80.297955)
self_id = 123
threshold = 20

last_send = time.time()

while True:
    data = ser.readline()
    packet = gpsd.get_current()
    self_loc = packet.position()
    if len(data) > 2:
        msg = data.decode()
        params = msg.split()
        if params[0] == 'ALERT':
            obj = json.loads(msg[len(params[0]):])
            if obj['type'] == 'BUOY':
                other_loc = (obj['location']['lat'], obj['location']['lon'])
                dist = geopy.distance.geodesic(self_loc, other_loc).km
                print("self: %s dist: %s loc: %s alert: %s" % (self_loc, dist, other_loc, dist < threshold))
    cur = time.time()
    if cur - last_send >= 10:
        obj = {
                'id': self_id,
                'type': 'SHIP',
                'location': {
                    'lat': self_loc[0],
                    'lon': self_loc[1]
                }
        }
        ser.write(json.dumps(obj).encode())
