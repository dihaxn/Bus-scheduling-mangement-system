import ProgressBar from "react-bootstrap/ProgressBar";
import { ReactComponent as Film } from "../../resources/film.svg";
import { ReactComponent as Location } from "../../resources/geo-alt.svg";
import { ReactComponent as Music } from "../../resources/music-note-beamed.svg";
import { ReactComponent as Temperature } from "../../resources/thermometer-snow.svg";
import Button from "react-bootstrap/Button";
import "../../pages/Map.css";



export default function Journey({ journey, color }) {
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