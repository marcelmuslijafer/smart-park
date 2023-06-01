import requests
import time
import argparse

def register_parking_spot(device, latitude, longitude, is_disabled):
    url = 'https://161.53.19.19:56443/m2m/data'
    timestamp = time.time()*1000
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
                "Grupa9Latitude": latitude,
                "Grupa9Longitude": longitude,
                "Grupa9ForDisabled": is_disabled
            }
        }
    }

    return requests.post(url, json=payload, headers=headers, auth=auth, verify=False)


parser = argparse.ArgumentParser(description='Data Jedi parking spot registration script')

parser.add_argument('device', type=str, help='Device')
parser.add_argument('latitude', type=float, help='Latitude')
parser.add_argument('longitude', type=float, help='Longitude')
parser.add_argument('disabled', type=int, help='Spot is disable')

args = parser.parse_args()

response = register_parking_spot(
        args.device,
        args.latitude,
        args.longitude,
        args.disabled
)

print(response)
print(response.content)
	
