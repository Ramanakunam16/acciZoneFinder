require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const node_xlsx = require("node-xlsx").default;
const port = process.env.PORT || 8000 || 8990;
const connection = require("./db.js");
const userRoutes = require("./Routes/users.js");
const authRoutes = require("./Routes/auth.js");
connection();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://acci-zone-finder.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const filePath = "./copy of book6.xlsx";
const workSheetsFromFile = node_xlsx.parse(filePath);

console.log(workSheetsFromFile[0].data[0]);
const keys = workSheetsFromFile[0].data[0]; // Extract keys from the first row
const dataObjects = workSheetsFromFile[0].data.slice(1).map((row) => {
  const obj = {};
  keys.forEach((key, index) => {
    obj[key] = row[index];
  });
  return obj;
});

app.post("/location", (req, res) => {
  console.log(req.body);
  const { lat, lng } = req.body;
  let closestMatch = null;
  const latS = lat.toString();
  const lngS = lng.toString();

  const latt = +latS.slice(0, 7);
  const lngg = +lngS.slice(0, 7);
  console.log(latt, lngg);

  dataObjects.forEach((coords) => {
    let tolerance = 0.01;
    const acciLat = coords.Lattitude.slice(0, 7);
    const acciLng = coords.longitude.slice(0, 7);
    // console.log(acciLat, acciLng);

    const latDiff = Math.abs(latt - +acciLat);
    const lngDiff = Math.abs(lngg - +acciLng);
    console.log(latDiff, lngDiff);

    if (latDiff <= tolerance && lngDiff <= tolerance) {
      closestMatch = coords;
    }
  });
  console.log(closestMatch);
  if (closestMatch) {
    // There is a close match
    console.log("Close match found:", closestMatch);
    // Proceed with further actions
  } else {
    // No close match found
    console.log("No close match found");
  }
  const matches = [closestMatch];
  res.json({ matches });
});

console.log(dataObjects);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
