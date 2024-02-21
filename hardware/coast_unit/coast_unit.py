import firebase_admin
import firebase_admin.firestore
import os
import serial

import json
import time

ser = serial.Serial('/dev/ttyUSB1', baudrate=115200, timeout=1)

if os.getenv("FIREBASE_CONFIG") == None:
    os.putenv("FIREBASE_CONFIG", "pyfirebasesdk.json")

cred_obj = firebase_admin.credentials.Certificate('pyfirebasesdk.json')
default_app = firebase_admin.initialize_app(credential = cred_obj)

db = firebase_admin.firestore.client(default_app)

while (1):
    data = ser.readline()
    if len(data) > 2:
        msg = data.decode()
        params = msg.split()
        if params[0] == 'ALERT':
            msg = msg[len(params[0]):]
            ob = json.loads(msg)
            ob['timestamp'] = time.time()
            print(ob)
            if ob['type'] == 'BUOY':
                del ob['type']
                db.collection("buoys").document("buoy-" + str(ob['id'])).set(ob)
            elif ob['type'] == 'SHIP':
                del ob['type']
                db.collection('ships').document("ship-" + str(ob['id'])).set(ob)
            else:
                print("Not sending ", end='')
                print(ob)
