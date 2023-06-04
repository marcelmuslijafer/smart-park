const express = require("express");
var https = require("https");
var axios = require("axios");
const app = express();
const port = 3000;

const mqtt = require("mqtt");
// mqtt://161.53.19.19:56883/grupa9/senzor1/reserve/
// const mqttBrokerUrl = "mqtt://mqtt.example.com"; // Zamijenite s pravom MQTT adresom
const mqttBrokerUrl = "mqtt://161.53.19.19:56883";
const mqttClient = mqtt.connect(mqttBrokerUrl);
try {
  mqttClient.on("connect", () => {
    console.log("MQTT povezan");
  });
} catch (error) {
  console.log(error);
}

const cors = require("cors");

app.use(cors());
app.use(express.json());

// mqtt://161.53.19.19:56883/grupa9/senzor1/reserve/
app.post("/reserveParkingSpace", (req, res) => {
  try {
    const parkingSpaceId = req.body.parkingSpaceId;
    const unreserve = req.body.unreserve;
    const sensorNumber = parkingSpaceId[parkingSpaceId.length - 1];

    const topic = "grupa9/senzor" + sensorNumber + "/reserve"; // Zamijenite s pravom MQTT temom
    const message = unreserve ? "unreserve!" : "reserve!"; // Zamijenite s pravom MQTT porukom

    mqttClient.publish(topic, message, (err) => {
      if (err) {
        console.error("Greška prilikom slanja MQTT poruke:", err);
        res.sendStatus(500);
      } else {
        console.log("MQTT poruka poslana");
        res.sendStatus(204);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    axios.defaults.httpsAgent = httpsAgent;

    axios
      .get(
        "https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor2&resourceSpec=Grupa9Status&latestNCount=1",
        {
          headers: {
            accept: "application/vnd.ericsson.m2m.output+json;version=1.1",
          },
          auth: {
            username: "IoTGrupa9",
            password: "IoTProject123",
          },
        }
      )
      .then(function (response) {
        const ret = response.data;
        console.log(ret);
        return res.json({ ret });
      });
  } catch (error) {
    console.log(error);
  }
});

app.post("/getStatisticsData", async function (req, res) {
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    var day = req.body.day;
    axios.defaults.httpsAgent = httpsAgent;
    var allData = [];
    var allDates = [];
    var allDatesAcrossSensors = [];
    var allValues = [];
    var writtenInHour = [];
    for (let i = 0; i < 24; i++) {
      allValues[i] = 0;
      writtenInHour[i] = 0;
    }
    for (let i = 1; i < 7; i++) {
      await axios
        .get(
          "https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor" +
            (i + 1) +
            "&resourceSpec=Grupa9Status",
          {
            headers: {
              accept: "application/vnd.ericsson.m2m.output+json;version=1.1",
            },
            auth: {
              username: "IoTGrupa9",
              password: "IoTProject123",
            },
          }
        )
        .then(function (response) {
          const ret = response.data;
          //console.log(ret)
          //return res.json({ret});
          allData[i - 1] = ret.contentNodes;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    console.log(allData);
    //pick only 1 day
    for (let i = 0; i < allData.length; i++) {
      allData[i] = allData[i].filter((object) => {
        var date = new Date(object.time);
        //console.log(date.getDay())
        if (date.getDay() == day) {
          return true;
        } else {
          return false;
        }
      });
    }
    for (let i = 0; i < allData.length; i++) {
      allDates = [];
      for(let x = 0; x < 24; x++) {
        writtenInHour[x] = 0;
      }
      for (let j = 0; j < allData[i].length; j++) {
        var date = new Date(allData[i][j].time).toISOString().split("T")[0];
        date = new Date(date);
        if(writtenInHour[date.getDay()] == 1) {
          continue;
        }
        if (!allDatesAcrossSensors.includes(date.toDateString())) {
          allDatesAcrossSensors.push(date.toDateString());
        }
        if (!allDates.includes(date.toDateString())) {
          allDates.push(date.toDateString());
          if (allData[i][j].value == 0) {
            var hours = new Date(allData[i][j].time).getHours();
            for (let x = 0; x < hours; x++) {
              allValues[x]++;
              writtenInHour[x] = 1;
            }
          } else {
            let index = -1;
            let hours = new Date(allData[i][j].time).getHours();
            console.log(hours);
            for (let x = j + 1; x < allData[i].length; x++) {
              if (allData[i][x].value == 0) {
                index = x;
                break;
              }
            }
            if (index == -1) {
              for (let x = hours; x < 24; x++) {
                allValues[x]++;
                writtenInHour[x] = 1;
              }
              break;
            } else {
              var hoursNeighbour = new Date(allData[i][index].time).getHours();
              for (let x = hours; x < hoursNeighbour; x++) {
                allValues[x]++;
                writtenInHour[x] = 1;
              }
            }
          }
        } else if (allData[i][j].value > 0) {
          let index = -1;
          let hours = new Date(allData[i][j].time).getHours();
          for (let x = j + 1; x < allData[i].length; x++) {
            if (allData[i][x].value == 0) {
              index = x;
              break;
            }
          }
          if (index == -1) {
            for (let x = hours; x < 24; x++) {
              allValues[x]++;
              writtenInHour[x] = 1;
            }
            break;
          } else {
            var hoursNeighbour = new Date(allData[i][index].time).getHours();
            for (let x = hours; x < hoursNeighbour; x++) {
              allValues[x]++;
              writtenInHour[x] = 1;
            }
          }
        }
      }
    }
    console.log(allData);
    console.log(allDatesAcrossSensors);

    allValues.forEach((element) => {
      element = element / allDatesAcrossSensors.length;
    });

    console.log(allValues);

    return res.json(allValues);
  } catch (error) {
    console.log(error);
  }
});

// export interface ParkingSpace {
//   id: string;
//   lat: number;
//   lng: number;
//   disabled: boolean;
//   taken: boolean;
//   reserved: boolean;
// }

app.get("/getParkingSpacesData", async function (req, res) {
  try {
    // kreiraj polje senzora koje dohvacam
    let parkingSpacesData = [];
    for (let i = 1; i < 7; i++) {
      parkingSpace = {
        id: "Grupa9UltrazvucniSenzor" + (i + 1),
        lat: -1,
        lng: -1,
        disabled: false,
        taken: false,
        reserved: false,
      };

      parkingSpacesData.push(parkingSpace);
    }

    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    axios.defaults.httpsAgent = httpsAgent;

    /*********************************************** */
    /******************Latitude********************* */
    /*********************************************** */
    for (let i = 1; i < 7; i++) {
      let response = await axios.get(
        "https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor" +
          (i + 1) +
          "&resourceSpec=Grupa9Latitude",
        {
          headers: {
            accept: "application/vnd.ericsson.m2m.output+json;version=1.1",
          },
          auth: {
            username: "IoTGrupa9",
            password: "IoTProject123",
          },
        }
      );

      let arrayOfValues = response.data.contentNodes;

      parkingSpacesData.forEach((ps) => {
        if (ps.id == arrayOfValues[0].source.sensorSpec) {
          ps.lat = arrayOfValues[0].value;
        }
      });
      // console.log("Latitude...");
      // console.log("lastValueForSensor:", arrayOfValues[arrayOfValues.length - 1].value);
      // console.log("sensorSpec:", arrayOfValues[arrayOfValues.length - 1].source.sensorSpec);
      // console.log("----------------");
    }

    /*********************************************** */
    /******************Longitude******************** */
    /*********************************************** */
    for (let i = 1; i < 7; i++) {
      let response = await axios.get(
        "https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor" +
          (i + 1) +
          "&resourceSpec=Grupa9Longitude",
        {
          headers: {
            accept: "application/vnd.ericsson.m2m.output+json;version=1.1",
          },
          auth: {
            username: "IoTGrupa9",
            password: "IoTProject123",
          },
        }
      );

      let arrayOfValues = response.data.contentNodes;

      parkingSpacesData.forEach((ps) => {
        if (ps.id == arrayOfValues[0].source.sensorSpec) {
          ps.lng = arrayOfValues[0].value;
        }
      });
      // console.log("Longitude...");
      // console.log("lastValueForSensor:", arrayOfValues[arrayOfValues.length - 1].value);
      // console.log("sensorSpec:", arrayOfValues[arrayOfValues.length - 1].source.sensorSpec);
      // console.log("----------------");
    }

    /*********************************************** */
    /******************ForDisabled****************** */
    /*********************************************** */
    for (let i = 1; i < 7; i++) {
      let response = await axios.get(
        "https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor" +
          (i + 1) +
          "&resourceSpec=Grupa9ForDisabled",
        {
          headers: {
            accept: "application/vnd.ericsson.m2m.output+json;version=1.1",
          },
          auth: {
            username: "IoTGrupa9",
            password: "IoTProject123",
          },
        }
      );

      let arrayOfValues = response.data.contentNodes;

      parkingSpacesData.forEach((ps) => {
        if (ps.id == arrayOfValues[0].source.sensorSpec) {
          if (arrayOfValues[0].value == 0) {
            ps.disabled = false;
          } else {
            ps.disabled = true;
          }
        }
      });
      // console.log("ForDisabled...");
      // console.log("lastValueForSensor:", arrayOfValues[arrayOfValues.length - 1].value);
      // console.log("sensorSpec:", arrayOfValues[arrayOfValues.length - 1].source.sensorSpec);
      // console.log("----------------");
    }

    /*********************************************** */
    /*********************Status******************** */
    /*********************************************** */
    for (let i = 1; i < 7; i++) {
      let response = await axios.get(
        "https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor" +
          (i + 1) +
          "&resourceSpec=Grupa9Status&latestNCount=1",
        {
          headers: {
            accept: "application/vnd.ericsson.m2m.output+json;version=1.1",
          },
          auth: {
            username: "IoTGrupa9",
            password: "IoTProject123",
          },
        }
      );

      if (!response.data.contentNodes) {
        parkingSpacesData.forEach((ps) => {
          let tempId = "Grupa9UltrazvucniSenzor" + (i + 1);
          if (ps.id == tempId) {
            ps.taken = false;
            ps.reserved = false;
          }
        });
      } else {
        let arrayOfValues = response.data.contentNodes;

        // 0 -> free
        // 1 -> taken
        // 2 -> reserved

        // export interface ParkingSpace {
        //   id: string;
        //   lat: number;
        //   lng: number;
        //   disabled: boolean;
        //   taken: boolean;
        //   reserved: boolean;
        // }

        parkingSpacesData.forEach((ps) => {
          if (
            ps.id == arrayOfValues[arrayOfValues.length - 1].source.sensorSpec
          ) {
            if (arrayOfValues[arrayOfValues.length - 1].value == 0) {
              ps.taken = false;
              ps.reserved = false;
            } else if (arrayOfValues[arrayOfValues.length - 1].value == 1) {
              ps.taken = true;
              ps.reserved = false;
            } else {
              ps.taken = false;
              ps.reserved = true;
            }
          }
        });
        // console.log("Status...");
        // console.log("lastValueForSensor:", arrayOfValues[arrayOfValues.length - 1].value);
        // console.log("sensorSpec:", arrayOfValues[arrayOfValues.length - 1].source.sensorSpec);
        // console.log("----------------");
      }
    }

    return res.json(parkingSpacesData);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
