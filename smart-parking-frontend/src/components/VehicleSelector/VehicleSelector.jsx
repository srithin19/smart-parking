import React from "react";
import "./VehicleSelector.css";

const VehicleSelector = ({ setVehicleType, vehicleType, isBikeParkingAvailable }) => {
  return (
    <div className="vehicle-selection">
      <h3>Select Vehicle</h3>
      <div className="vehicle-options">
        <div
          className={`vehicle-option ${vehicleType === "Car" ? "selected" : ""}`}
          onClick={() => setVehicleType("Car")}
        >
          <div className="vehicle-icon-wrapper">
            <svg className="vehicle-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          <span className="vehicle-label">Car</span>
        </div>
        <div
          className={`vehicle-option ${vehicleType === "Bike" ? "selected" : ""} ${!isBikeParkingAvailable ? "disabled" : ""}`}
          onClick={() => isBikeParkingAvailable && setVehicleType("Bike")}
          title={!isBikeParkingAvailable ? "Bike parking only available on B1" : ""}
        >
          <div className="vehicle-icon-wrapper">
            <svg className="vehicle-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
            </svg>
          </div>
          <span className="vehicle-label">Bike</span>
          {!isBikeParkingAvailable && <span className="unavailable-label">B1 Only</span>}
        </div>
      </div>
    </div>
  );
};

export default VehicleSelector;