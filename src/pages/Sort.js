import { ReactComponent as Funnel } from "../resources/funnel-fill.svg";
import Button from "react-bootstrap/Button";
function Sort({ bustable, SortbyName, SortbyAttribute }) {
  return (
    <div className="Container">
      <div className="Label">
        <Button variant="outline-dark">
          <Funnel />
        </Button>
        <h4>Sort By :</h4>
      </div>
      <div className="sort">
        <Button
          variant="outline-dark"
          onClick={() => {
            SortbyName(bustable);
          }}
        >
          Name
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            SortbyAttribute(bustable, "fare");
          }}
        >
          Fare
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            SortbyAttribute(bustable, "seats");
          }}
        >
          Seats Availabilty
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            SortbyAttribute(bustable, "depature");
          }}
        >
          Depature Time
        </Button>
        <Button
          variant="outline-dark"
          onClick={() => {
            SortbyAttribute(bustable, "arrival");
          }}
        >
          Arrival Time
        </Button>
      </div>
    </div>
  );
}

export default Sort;
