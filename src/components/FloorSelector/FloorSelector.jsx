import React from "react";
import "./FloorSelector.css";

const FloorSelector = ({ setSelectedFloor }) => {
  return (
    <div className="floor-selection">
      <h3>Select Floor</h3>
      <div className="floor-buttons">
        <button onClick={() => setSelectedFloor("B1")}>B1</button>
        <button onClick={() => setSelectedFloor("B2")}>B2</button>
        <button onClick={() => setSelectedFloor("B3")}>B3</button>
      </div>
    </div>
  );
};

export default FloorSelector;