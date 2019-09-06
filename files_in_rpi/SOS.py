import requests
from RSSI2 import getRSSI

#json_data = {
#    "id" : 1,
#    "RSSI" : [
#        ["STU",-31],
#        ["Felix",-64],
#        ["iphone",-63]
#    ]
#}

def sendSOS():
    data = {
        "id" : 1,
        "RSSI" : getRSSI()
    }
    # print(json_data)
    r1 = requests.get("http://192.168.43.76:9001/sos",params=data)
    print(r1.text)

def sendCancel():
    data = {
        "id" : 1
    }
    r1 = requests.get("http://192.168.43.76:9001/cancel",params=data)
    print(r1.text)

#sendSOS()