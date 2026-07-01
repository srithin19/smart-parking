import React from "react";
import "./FloorSelector.css";

const FloorSelector = ({ setSelectedFloor, selectedFloor }) => {
  return (
    <div className="floor-selection">
      <h3>Select Floor</h3>
      <div className="floor-buttons">
        <button
          className={selectedFloor === "B1" ? "active" : ""}
          onClick={() => setSelectedFloor("B1")}
        >
          B1
        </button>
        <button
          className={selectedFloor === "B2" ? "active" : ""}
          onClick={() => setSelectedFloor("B2")}
        >
          B2
        </button>
        <button
          className={selectedFloor === "B3" ? "active" : ""}
          onClick={() => setSelectedFloor("B3")}
        >
          B3
        </button>
      </div>
    </div>
  );
};

export default FloorSelector;