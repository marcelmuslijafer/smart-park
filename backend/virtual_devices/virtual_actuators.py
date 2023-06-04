import virtual_actuators_helper
import time
import urllib3
import paho.mqtt.client as mqtt


# Disable the InsecureRequestWarning
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


parking_spot_statuses = {2: 0, 3: 0, 4: 0, 5: 0, 6: 0}

parking_spot_for_disabled = {2: 0, 3: 0, 4: 0, 5: 0, 6: 0}

for i in range(2, 7):
    is_for_disabled = virtual_actuators_helper.read_parking_spot_info(i)
    parking_spot_for_disabled[i] = is_for_disabled

print()


sensors_names = {2: 'Grupa9UltrazvucniSenzor2',
                 3: 'Grupa9UltrazvucniSenzor3',
                 4: 'Grupa9UltrazvucniSenzor4',
                 5: 'Grupa9UltrazvucniSenzor5',
                 6: 'Grupa9UltrazvucniSenzor6'}

topics = {'grupa9/senzor2/reserve': 2,
          'grupa9/senzor3/reserve': 3,
          'grupa9/senzor4/reserve': 4,
          'grupa9/senzor5/reserve': 5,
          'grupa9/senzor6/reserve': 6}


client = mqtt.Client("virtual actuators mqtt")
client.connect(host="161.53.19.19", port=56883)

client.subscribe("grupa9/senzor2/reserve")
client.subscribe("grupa9/senzor3/reserve")
client.subscribe("grupa9/senzor4/reserve")
client.subscribe("grupa9/senzor5/reserve")
client.subscribe("grupa9/senzor6/reserve")


def callback(client, userdata, message):
    message_text = str(message.payload.decode("utf-8"))
    if message_text == "reserve!":
        sensor_id = topics[message.topic]
        parking_spot_status = parking_spot_statuses[sensor_id]
        if parking_spot_status == 1:
            print("Cannot reserve parking spot " + str(sensor_id) + " because it is taken.")
        elif parking_spot_status == 2:
            print("Cannot reserve parking spot " + str(sensor_id) + " because it is already reserved.")
        else:
            parking_spot_statuses[sensor_id] = 2
            virtual_actuators_helper.send_reservation_message(sensors_names[sensor_id], 2)
    elif message_text == "unreserve!":
        sensor_id = topics[message.topic]
        parking_spot_status = parking_spot_statuses[sensor_id]
        if parking_spot_status == 2:
            parking_spot_statuses[sensor_id] = 0
            virtual_actuators_helper.send_reservation_message(sensors_names[sensor_id], 0)
        else:
            print("Cannot unreserve parking spot " + str(sensor_id) + " because it is not reserved.")


client.on_message = callback

client.loop_start()

while True:
    time.sleep(5)   # sleep for 5 seconds
    for i in range(2, 7):
        old_parking_status = parking_spot_statuses[i]
        new_parking_status = virtual_actuators_helper.read_parking_spot_status(i)
        if new_parking_status == 0:
            if old_parking_status == 2:
                print("Ignoring the fact that the parking spot " + str(i) + " is now free because it is reserved.")
                print("LED " + str(i) + " -> YELLOW")
            else:
                parking_spot_statuses[i] = 0
                if parking_spot_for_disabled[i] == 0:
                    print("LED " + str(i) + " -> GREEN")
                else:
                    print("LED " + str(i) + " -> BLUE")
        elif new_parking_status == 1:
            parking_spot_statuses[i] = 1
            print("LED " + str(i) + " -> RED")
        else:
            print("LED " + str(i) + " -> YELLOW")
    print()

