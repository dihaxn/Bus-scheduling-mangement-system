import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Bussearch from "../components/Bussearch";
import Footer from "../components/Footer";
import "../components/Header.css";
import Header from "../components/Header";
import "./Map.css";
import "./Home.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { ReactComponent as Film } from "../resources/film.svg";
import { ReactComponent as Location } from "../resources/geo-alt.svg";
import { ReactComponent as Music } from "../resources/music-note-beamed.svg";
import { ReactComponent as Temperature } from "../resources/thermometer-snow.svg";
import Sort from "./Sort";
import businfo from "../components/busInfo";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Map() {
  const [bustable, setBusinfo] = useState(businfo);
  const location = useLocation();
  const navigate = useNavigate();

  function SortbyName(bustable) {
    bustable = businfo.slice().sort((a, b) => a.Name.localeCompare(b.Name));
    setBusinfo(bustable);
  }

  function SortbyAttribute(bustable, attribute) {
    bustable = businfo.slice().sort((a, b) => a[attribute] - b[attribute]);
    setBusinfo(bustable);
  }

  function SortByCity(bustable, city) {
    if (location.pathname !== "/map") {
      navigate("/map");
    }
    bustable = businfo.slice().filter((a) => a.city === city);
    setBusinfo(bustable);
  }

  return (
    <div className="home-container">
      <div className="head">
        <Header />
        <br />
        <br />
        <br />

        <div className="content">
          <br />
          <br />
          <div className="search-bar">
            <br />
            <Bussearch bustable={bustable} SortByCity={SortByCity} />
          </div>
        </div>
      </div>
      <Sort
        bustable={bustable}
        SortbyName={SortbyName}
        SortbyAttribute={SortbyAttribute}
      />
      <Timetable bustable={bustable} />
    </div>
  );
}

function Timetable({ bustable }) {
  const color = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
  ];

  //2console.log(randnum);

  return (
    <div className="list">
      <ul>
        {bustable.map((init) => (
          <Journey
            journey={init}
            color={color[Math.floor(Math.random() * 7)]}
          />
        ))}
      </ul>
    </div>
  );
}
function Journey({ journey, color }) {
  return (
    <li>
      <div className="BusDetail">
        <Button variant={color}>{journey.Name}</Button>
        <p>Route number : {Math.floor(Math.random() * 300)}</p>
      </div>
      <div className="Shedule">
        <p>{journey.city} to Matara</p>
        <ProgressBar variant="info" now={Math.floor(Math.random() * 100)} />
        <p>
          {journey.arrival}
          {journey.arrival < 12 ? "AM" : "PM"}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {journey.depature}
          {journey.depature < 12 ? "AM" : "PM"}
        </p>
        <small>Every Journey minimaly take 2 hours</small>
      </div>
      <div className="Icons">
        <div className="Icon">
          <Button variant="outline-dark">
            <Film />
          </Button>
          <Button variant="outline-dark">
            <Location />
          </Button>
          <Button variant="outline-dark">
            <Location />
          </Button>
          <Button variant="outline-dark">
            <Temperature />
          </Button>
        </div>
        <p>View Cancellation Policy</p>
      </div>
      <div className="Ticket">
        <h5>LKR {journey.fare}.00</h5>
        <p>Available Seats :{journey.seats}</p>
        <Button variant={journey.seats ? "success" : "danger"}>
          {journey.seats ? "Available" : "Sold out"}
        </Button>
      </div>
    </li>
  );
}
