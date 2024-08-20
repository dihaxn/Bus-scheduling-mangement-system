import React, { useState } from "react";
import Bussearch from "../components/Bussearch";
import "../components/Header.css";
import Header from "../components/Header";

import "./Home.css";
import Sort from "./Sort";
import businfo from "../components/Timetable-components/busInfo";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Journey from "../components/Timetable-components/Journey";



export default function Map() {
  const [bustable, setBusinfo] = useState(businfo);
  const location = useLocation();
  const destination = location.state?.destination || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (destination) {
      const filteredBustable = businfo.filter(
        (bus) => bus.city === destination
      );
      setBusinfo(filteredBustable);
    }
  }, [destination]);

  function SortbyName(bustable) {
    bustable = bustable.slice().sort((a, b) => a.Name.localeCompare(b.Name));
    setBusinfo(bustable);
  }

  function SortbyAttribute(bustable, attribute) {
    bustable = bustable.slice().sort((a, b) => a[attribute] - b[attribute]);
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

