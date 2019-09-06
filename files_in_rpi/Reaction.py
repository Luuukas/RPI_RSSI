import RPi.GPIO as GPIO
import time
from SOS import sendSOS
from SOS import sendCancel
# channels
trig = 2
stop = 26
acti = 19
ligy = 13
ligb = 6
ligr = 5

# consts
spac = 5
resc = 5
interval = 0.2

def init():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(trig,GPIO.OUT,initial=GPIO.LOW)
    GPIO.setup(ligb,GPIO.OUT,initial=GPIO.LOW)
    GPIO.setup(ligy,GPIO.OUT,initial=GPIO.LOW)
    GPIO.setup(ligr,GPIO.OUT,initial=GPIO.LOW)
    GPIO.setup(stop,GPIO.IN,pull_up_down=GPIO.PUD_UP)
    GPIO.setup(acti,GPIO.IN,pull_up_down=GPIO.PUD_UP)
    pass

def beep(seconds):
    GPIO.output(trig, GPIO.LOW)
    GPIO.output(ligr,GPIO.HIGH)
    time.sleep(seconds)
    GPIO.output(trig,GPIO.HIGH)
    GPIO.output(ligr,GPIO.LOW)

def beepBatch(seconds,timespan,counts):
    delcnt = 0
    for i in range(counts):
        delcnt += (GPIO.input(stop)==0)
        print(GPIO.input(stop))
        if delcnt > (resc-1):
            GPIO.output(trig, GPIO.LOW)
            sendCancel()
            return
        beep(seconds)
        time.sleep(timespan)
    GPIO.output(trig, GPIO.LOW)
        
def check():
    GPIO.output(ligb,GPIO.HIGH)
    cnt = [1,1,1]
    time.sleep(interval)
    while GPIO.input(acti)==0:
        print(GPIO.input(acti))
        cnt[0] += 1
        time.sleep(interval)
    
    cont = False
    for i in range(spac):
        print(GPIO.input(acti))
        if GPIO.input(acti)==0:
            cont = True
            break;
        time.sleep(interval)
        
    GPIO.output(ligb,GPIO.LOW)
    
    if not cont:
        return;
    
    GPIO.output(ligy,GPIO.HIGH)
    
    while GPIO.input(acti)==0:
        print(GPIO.input(acti))
        cnt[1] += 1
        time.sleep(interval)
    
    cont = False
    for i in range(spac):
        print(GPIO.input(acti))
        if GPIO.input(acti)==0:
            cont = True
            break;
        time.sleep(interval)
    
    GPIO.output(ligy,GPIO.LOW)
    
    if not cont:
        return;
    
    GPIO.output(ligr,GPIO.HIGH)
    
    while GPIO.input(acti)==0:
        print(GPIO.input(acti))
        cnt[1] += 1
        time.sleep(interval)
        
    GPIO.output(ligr,GPIO.LOW)
        
    return (cnt[0]<cnt[1] and cnt[2]<cnt[1])

init()

while True:
    print(GPIO.input(acti))
    if GPIO.input(acti)==0:
        if(check()):
            sendSOS()
            beepBatch(0.1,interval,33)
    else:
        time.sleep(interval)

GPIO.cleanup()
