import requests


def read_parking_spot_info(device_id):

    url = 'https://161.53.19.19:56443/m2m/data'
    auth = requests.auth.HTTPBasicAuth('IoTGrupa9', 'IoTProject123')
    headers = {
        "Accept": "application/vnd.ericsson.m2m.output+json;version=1.1"
    }

    response1 = requests.get(url + "?sensorSpec=Grupa9UltrazvucniSenzor" + str(device_id) + "&resourceSpec=Grupa9Latitude", headers=headers, auth=auth, verify=False)
    latitude = response1.json()["contentNodes"][0]["value"]

    response2 = requests.get(url + "?sensorSpec=Grupa9UltrazvucniSenzor" + str(device_id) + "&resourceSpec=Grupa9Longitude", headers=headers, auth=auth, verify=False)
    longitude = response2.json()["contentNodes"][0]["value"]

    response3 = requests.get(url + "?sensorSpec=Grupa9UltrazvucniSenzor" + str(device_id) + "&resourceSpec=Grupa9ForDisabled", headers=headers, auth=auth, verify=False)
    for_disabled = response3.json()["contentNodes"][0]["value"]

    print("Parking spot " + str(device_id) + " data:")
    print("   latitude: " + str(latitude))
    print("   longitude: " + str(longitude))
    if for_disabled:
        print("   is for disabled: yes")
    else:
        print("   is for disabled: no")

    return for_disabled


def read_parking_spot_status(device_id):

    url = 'https://161.53.19.19:56443/m2m/data'
    auth = requests.auth.HTTPBasicAuth('IoTGrupa9', 'IoTProject123')
    headers = {
        "Accept": "application/vnd.ericsson.m2m.output+json;version=1.1"
    }

    response = requests.get(url + "?sensorSpec=Grupa9UltrazvucniSenzor" + str(device_id) + "&resourceSpec=Grupa9Status&latestNCount=4", headers=headers, auth=auth, verify=False)
    content_nodes = response.json()["contentNodes"]

    for content_node in content_nodes:
        if content_node["source"]["resourceSpec"] == "Grupa9Status":
            return content_node["value"]




