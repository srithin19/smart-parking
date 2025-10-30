import React from "react";
import "./VehicleSelector.css";

const VehicleSelector = ({ setVehicleType }) => {
  return (
    <div className="vehicle-selection">
      <h3>Select Vehicle</h3>
      <div className="vehicle-options">
        <div className="vehicle-option" onClick={() => setVehicleType("Car")}>
          <img
            src="/assets/car.png"
            alt="Car"
            className="vehicle-image"
          />
        </div>
        <div className="vehicle-option" onClick={() => setVehicleType("Bike")}>
          <img
            src="/assets/bike.png"
            alt="Bike"
            className="vehicle-image"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleSelector;