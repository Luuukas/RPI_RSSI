import time
import pywifi

def getRSSI():
    wifi = pywifi.PyWiFi()
    ifaceList = wifi.interfaces()

    iface = ifaceList[0]
    iface.scan()

    result = iface.scan_results()

    RSSI = []
    for i in range(len(result)):
        RSSI.append([(result[i].ssid).encode(),result[i].signal])
        
    # print(RSSI)
    return RSSI
