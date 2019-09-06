from bluepy.btle import Scanner, DefaultDelegate
class ScanDelegate(DefaultDelegate): 
    def __init__(self): 
        DefaultDelegate.__init__(self)

    def handleDiscovery(self, dev, isNewDev, isNewData): 
        if isNewDev: 
            print "Discovered device", dev.addr 
        elif isNewData: 
            print "Received new data from", dev.addr\

def getRSSI():
    scanner = Scanner().withDelegate(ScanDelegate())
    devices = scanner.scan(10.0)
    RSSI = []
    for dev in devices:
        RSSI.append([dev.addr, dev.rssi])
    return RSSI

# print(getRSSI())