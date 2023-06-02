const express = require("express");
var https = require("https");
var axios = require("axios");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
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

  console.log(allValues)

  return res.json(allValues);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
