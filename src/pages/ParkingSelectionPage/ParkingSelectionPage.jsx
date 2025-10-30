import React, { useState } from "react";

// Components
import VehicleSelector from "../../components/VehicleSelector/VehicleSelector";
import FloorSelector from "../../components/FloorSelector/FloorSelector";
import FloorMap from "../../components/FloorMap/FloorMap";

// Styles
import "./ParkingSelectionPage.css";

const ParkingSelectionPage = () => {
  const [vehicleType, setVehicleType] = useState("Car");
  const [selectedFloor, setSelectedFloor] = useState("B1");

  return (
    <div className="parking-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Smart Parking</h2>
        <VehicleSelector setVehicleType={setVehicleType} />
        <FloorSelector setSelectedFloor={setSelectedFloor} />
      </aside>

      {/* Main content */}
      <main className="main-parking-area">
        <h3>
          Parking Map - {selectedFloor} ({vehicleType})
        </h3>
        <FloorMap vehicleType={vehicleType} floor={selectedFloor} />
      </main>
    </div>
  );
};

export default ParkingSelectionPage;