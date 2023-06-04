import virtual_sensors_helper
import random
import time
import urllib3


# Disable the InsecureRequestWarning
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

sensors_names = {2: 'Grupa9UltrazvucniSenzor2',
                 3: 'Grupa9UltrazvucniSenzor3',
                 4: 'Grupa9UltrazvucniSenzor4',
                 5: 'Grupa9UltrazvucniSenzor5',
                 6: 'Grupa9UltrazvucniSenzor6'}
sensors_statuses = {2: 0, 3: 0, 4: 0, 5: 0, 6: 0}

virtual_sensors_helper.register_sensor(sensors_names[2], 45.80082, 15.970744, 0)
virtual_sensors_helper.register_sensor(sensors_names[3], 45.800813, 15.970691, 0)
virtual_sensors_helper.register_sensor(sensors_names[4], 45.800809, 15.970632, 0)
virtual_sensors_helper.register_sensor(sensors_names[5], 45.800801, 15.970562, 1)
virtual_sensors_helper.register_sensor(sensors_names[6], 45.800783, 15.970468, 1)

for i in range(2, 7):
    virtual_sensors_helper.create_sensor_reading(sensors_names[i], 0)


while True:

    wait_time = random.uniform(5, 20)
    time.sleep(wait_time)

    sensor_id = random.randint(2, 6)
    sensor_status = sensors_statuses[sensor_id]

    if sensor_status == 0:
        virtual_sensors_helper.create_sensor_reading(sensors_names[sensor_id], 1)  # free parking space in now taken
        sensors_statuses[sensor_id] = 1
    elif sensor_status == 1:
        virtual_sensors_helper.create_sensor_reading(sensors_names[sensor_id], 0)  # taken parking space in now free
        sensors_statuses[sensor_id] = 0
    else:
        virtual_sensors_helper.create_sensor_reading(sensors_names[sensor_id], 1)  # reserved parking space in now taken
        sensors_statuses[sensor_id] = 1

