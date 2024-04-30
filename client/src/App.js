import axios from "axios";
import { useState, useEffect, useMap } from "react";
import "leaflet/dist/leaflet.css";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import SignUp from "./components/SignUp";
import About from "./components/About";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SearchComponent from "./components/SearchComponent";
import L from "leaflet";
import iconUrl from "./locationIcon.png";
const icon = L.icon({
  iconUrl: iconUrl,
  iconSize: [38, 38], // Size of the icon
});
function App() {
  const [userChecked, setUserChecked] = useState([]);
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Banner />
              </>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
        ></Route>
        <Route
          path="/map"
          element={
            <div className="map">
              <Map setUserChecked={setUserChecked} />
              <div className="map-side-content">
                <>
                  <SearchComponent />
                  <SendLocation />
                  <CheckedHistory userChecked={userChecked} />
                </>
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

function Map({ setUserChecked }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [clickedPosition, setClickedPosition] = useState(null);

  useEffect(() => {
    // Create a map instance
    const mapInstance = L.map("map").setView(
      [18.299772945276406, 83.89434814453125],
      17
    );
    setMap(mapInstance);

    // Add a tile layer to the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    // Cleanup function
    return () => {
      // Remove the map when component unmounts
      mapInstance.remove();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    // Render a marker at the clicked position
    if (map && clickedPosition) {
      // Create marker
      const marker = L.marker([clickedPosition.lat, clickedPosition.lng], {
        icon: icon,
      }).addTo(map);
      // Bind popup to the marker with popup message
      marker
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
          })
        )
        .setPopupContent("sdfghj")
        .openPopup();
      // Store the marker in the state
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    }
  }, [map, clickedPosition]);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng; // Get latitude and longitude of clicked position
    try {
      // Send the clicked position to the server
      const response = await axios.post(
        "https://acci-zone-finder-api.vercel.app/location",
        {
          lat,
          lng,
        }
      );
      console.log(response.data.matches[0]);
      // Store the clicked position with popup message in the state
      setClickedPosition({
        lat,
        lng,
        popupMessage: "sadfgb",
      });
      setUserChecked((prevChecked) => [
        ...prevChecked,
        {
          lat,
          lng,
          message: "response.data.popupMessage",
        },
      ]);
    } catch (error) {
      console.error("Error sending position to server:", error);
    }
  };

  useEffect(() => {
    // Attach click event listener to the map
    if (map) {
      map.on("click", handleMapClick);
    }
    // Cleanup function
    return () => {
      // Remove the event listener when component unmounts
      if (map) {
        map.off("click", handleMapClick);
      }
    };
  }, [map]); // Dependency array ensures this effect runs when map is ready

  return <div id="map" style={{ height: "100vh" }}></div>;
}
function CheckedHistory({ userChecked }) {
  return (
    <div className="history">
      <h2>Checked History</h2>
      <ul>
        {userChecked.map((checkedPosition, index) => (
          <li key={index}>
            <strong>Location:</strong> {checkedPosition.location},{" "}
            <strong>City:</strong> {checkedPosition.city},{" "}
            <strong>Country:</strong> {checkedPosition.country}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SendLocation() {
  const [currentLocation, setCurrentLocation] = useState();
  const [message, setMessage] = useState(
    "Send your current location to check the match"
  );
  const [isMatched, setIsMatched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  function handleClick() {
    setMessage("Sending your current location...");
    setErrorMessage(() => "");

    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 97000,
      };
      navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          console.log(position);
          console.log(`https://www.google.com/maps/@${lat + 1},${lon + 10}`);
          axios
            .post("http://localhost:8000/location", { lat, lon })
            .then((res) => {
              if (res.data.matched) {
                setMessage("Location Matched");
              }
              setMessage("Location didn`t match!");
              setIsClicked(!isClicked);
              console.log(res);
            })
            .catch((error) => {
              setIsClicked(!isClicked);
              setErrorMessage("Error sending location data: " + error.message);
              setMessage("Error sending location data");
            });
        },
        (error) => {
          setIsClicked(!isClicked);
          setErrorMessage("Error retrieving location: " + error.message);
          setMessage("Error retrieving location");
        },
        options
      );
    } else {
      console.log("not found");
    }
  }
  function handleRetry() {
    setIsClicked(!isClicked);
    setMessage(() => "Send your current location to check the match");
    setErrorMessage(() => "");
  }
  return (
    <div className="sendLocBtn">
      <button onClick={() => handleClick()} disabled={isClicked}>
        Send your current location
      </button>

      {errorMessage && <p>{errorMessage}</p>}
      <p>{message}</p>
      {isClicked ? <button onClick={() => handleRetry()}>Retry</button> : ""}
    </div>
  );
}

export default App;
