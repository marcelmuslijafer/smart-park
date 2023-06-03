const express = require("express");
var https = require("https");
var axios = require("axios");
const app = express();
const port = 3000;

const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  axios.defaults.httpsAgent = httpsAgent;

  axios
    .get("https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor2&resourceSpec=Grupa9Status&latestNCount=1", {
      headers: {
        accept: "application/vnd.ericsson.m2m.output+json;version=1.1",
      },
      auth: {
        username: "IoTGrupa9",
        password: "IoTProject123",
      },
    })
    .then(function (response) {
      const ret = response.data;
      console.log(ret);
      return res.json({ ret });
    });
});

app.get("/statisticsData", async function (req, res) {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  var day = 4;
  axios.defaults.httpsAgent = httpsAgent;
  var allData = [];
  var allDates = [];
  var allDatesAcrossSensors = [];
  var allValues = [];
  var allFilteredData = [];
  for (let i = 0; i < 24; i++) {
    allValues[i] = 0;
  }
  for (let i = 0; i < 6; i++) {
    await axios
      .get("https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor" + (i + 1) + "&resourceSpec=Grupa9Status", {
        headers: {
          accept: "application/vnd.ericsson.m2m.output+json;version=1.1",
        },
        auth: {
          username: "IoTGrupa9",
          password: "IoTProject123",
        },
      })
      .then(function (response) {
        const ret = response.data;
        //console.log(ret)
        //return res.json({ret});
        allData[i] = ret.contentNodes;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
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
    for (let j = 0; j < allData[i].length; j++) {
      var date = new Date(allData[i][j].time).toISOString().split("T")[0];
      date = new Date(date);
      if (!allDatesAcrossSensors.includes(date.toDateString())) {
        allDatesAcrossSensors.push(date.toDateString());
      }
      if (!allDates.includes(date.toDateString())) {
        allDates.push(date.toDateString());
        if (allData[i][j].value == 0) {
          var hours = new Date(allData[i][j].time).getHours();
          for (let x = 0; x < hours; x++) {
            allValues[x]++;
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
            }
            break;
          } else {
            var hoursNeighbour = new Date(allData[i][index].time).getHours();
            for (let x = hours; x < hoursNeighbour; x++) {
              allValues[x]++;
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
          }
          break;
        } else {
          var hoursNeighbour = new Date(allData[i][index].time).getHours();
          for (let x = hours; x < hoursNeighbour; x++) {
            allValues[x]++;
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
  // kreiraj polje senzora koje dohvacam
  let parkingSpacesData = [];
  for (let i = 0; i < 6; i++) {
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
  for (let i = 0; i < 6; i++) {
    let response = await axios.get("https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor" + (i + 1) + "&resourceSpec=Grupa9Latitude", {
      headers: {
        accept: "application/vnd.ericsson.m2m.output+json;version=1.1",
      },
      auth: {
        username: "IoTGrupa9",
        password: "IoTProject123",
      },
    });

    let arrayOfValues = response.data.contentNodes;

    parkingSpacesData.forEach((ps) => {
      if (ps.id == arrayOfValues[arrayOfValues.length - 1].source.sensorSpec) {
        ps.lat = arrayOfValues[arrayOfValues.length - 1].value;
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
  for (let i = 0; i < 6; i++) {
    let response = await axios.get("https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor" + (i + 1) + "&resourceSpec=Grupa9Longitude", {
      headers: {
        accept: "application/vnd.ericsson.m2m.output+json;version=1.1",
      },
      auth: {
        username: "IoTGrupa9",
        password: "IoTProject123",
      },
    });

    let arrayOfValues = response.data.contentNodes;

    parkingSpacesData.forEach((ps) => {
      if (ps.id == arrayOfValues[arrayOfValues.length - 1].source.sensorSpec) {
        ps.lng = arrayOfValues[arrayOfValues.length - 1].value;
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
  for (let i = 0; i < 6; i++) {
    let response = await axios.get("https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor" + (i + 1) + "&resourceSpec=Grupa9ForDisabled", {
      headers: {
        accept: "application/vnd.ericsson.m2m.output+json;version=1.1",
      },
      auth: {
        username: "IoTGrupa9",
        password: "IoTProject123",
      },
    });

    let arrayOfValues = response.data.contentNodes;

    parkingSpacesData.forEach((ps) => {
      if (ps.id == arrayOfValues[arrayOfValues.length - 1].source.sensorSpec) {
        if (arrayOfValues[arrayOfValues.length - 1].value == 0) {
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
  for (let i = 0; i < 6; i++) {
    let response = await axios.get(
      "https://161.53.19.19:56443/m2m/data?sensorSpec=Grupa9UltrazvucniSenzor" + (i + 1) + "&resourceSpec=Grupa9Status&latestNCount=1",
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
        if (ps.id == arrayOfValues[arrayOfValues.length - 1].source.sensorSpec) {
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
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
