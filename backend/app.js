// imports
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geolocation = require("./geolocation/geocoding");
const forecast = require("./weather/forecast");

//variables
const app = express();
const port = 3000;

//Define Paths for Express Config
const frontendDirectory = path.join(__dirname, "../frontend");
const partialsDirectory = path.join(__dirname, "../frontend/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", frontendDirectory);
hbs.registerPartials(partialsDirectory);

//Setup static directory to serve
app.use(express.static(frontendDirectory));

//Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About the app...",
  });
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("/forecast", (req, res) => {
  //Setting Data
  const address = req.query.address;

  //Missing Address
  if (!address || address === 0) {
    return res.send({ error: "You must provide an address" });
  }

  //Getting Location
  geolocation(address, (error, data) => {
    const location = data.location;
    //Handling Errors
    if (error) {
      return res.send(error);
    }

    //Getting Weather information
    forecast(data.latitude, data.longitude, (error, data) => {
      //Handling Errors
      if (error) {
        return res.send(error);
      }

      //Handling Data
      res.send({
        location,
        temperature: data.temperature,
        humidity: data.humidity,
        pressure: data.pressure,
      });
    });
  });
});
//listening to server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
