import requests
import time


def register_sensor(device_id, latitude, longitude, is_disabled):

    print("Registering sensor " + device_id + ".")

    url = 'https://161.53.19.19:56443/m2m/data'
    timestamp = time.time() * 1000
    auth = requests.auth.HTTPBasicAuth('IoTGrupa9', 'IoTProject123')
    headers = {
        "Content-Type": "application/vnd.ericsson.simple.input.hierarchical+json;version=1.0"
    }
    payload = {
        "deviceId": "Grupa9GatewayGroup1",
        "header": {
            "timeStamp": timestamp
        },
        "body": {
            device_id: {
                "Grupa9Latitude": latitude,
                "Grupa9Longitude": longitude,
                "Grupa9ForDisabled": is_disabled
            }
        }
    }

    return requests.post(url, json=payload, headers=headers, auth=auth, verify=False)


def create_sensor_reading(device, status):

    if status == 0:
        print("Sensor " + device + " noticed that its parking space is now free.")
    elif status == 1:
        print("Sensor " + device + " noticed that its parking space is now taken.")
    else:
        print("Sensor " + device + " noticed that its parking space is now reserved.")

    url = 'https://161.53.19.19:56443/m2m/data'
    timestamp = time.time() * 1000
    auth = requests.auth.HTTPBasicAuth('IoTGrupa9', 'IoTProject123')
    headers = {
        "Content-Type": "application/vnd.ericsson.simple.input.hierarchical+json;version=1.0"
    }
    payload = {
        "deviceId": "Grupa9GatewayGroup1",
        "header": {
            "timeStamp": timestamp
        },
        "body": {
            device: {
                "Grupa9Status": status
            }
        }
    }

    return requests.post(url, json=payload, headers=headers, auth=auth, verify=False)

