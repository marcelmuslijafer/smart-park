const express = require('express')
var https = require('https')
var axios = require('axios')
const app = express()
const port = 3000

app.get('/', (req, res) => {
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
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})