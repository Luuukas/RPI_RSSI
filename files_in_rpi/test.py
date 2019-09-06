import RPi.GPIO as GPIO
import time
from SOS import sendSOS

test = 21

def init():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(test,GPIO.IN,pull_up_down=GPIO.PUD_UP)
    pass

init()
interval = 0.5
while True:
    print(GPIO.input(test))
    if GPIO.input(test)==0:
        sendSOS()
    time.sleep(interval)

GPIO.cleanup()