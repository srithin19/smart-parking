import React, { useState, useEffect } from "react";

// Components
import VehicleSelector from "../../components/VehicleSelector/VehicleSelector";
import FloorSelector from "../../components/FloorSelector/FloorSelector";
import FloorPlan from "../../components/FloorPlan/FloorPlan";

// Styles
import "./ParkingSelectionPage.css";

const ParkingSelectionPage = () => {
  const [vehicleType, setVehicleType] = useState("Car");
  const [selectedFloor, setSelectedFloor] = useState("B1");

  // B2 and B3 only support cars, so switch to Car if Bike is selected
  useEffect(() => {
    if ((selectedFloor === "B2" || selectedFloor === "B3") && vehicleType === "Bike") {
      setVehicleType("Car");
    }
  }, [selectedFloor, vehicleType]);

  // Check if bike parking is available on the selected floor
  const isBikeParkingAvailable = selectedFloor === "B1";

  return (
    <div className="parking-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">🚗 Smart Parking</h2>
        <div className="floor-info-card">
          <h4>Floor Information</h4>
          <div className="floor-details">
            <div className="floor-detail-item">
              <strong>B1:</strong> <span>100 Bikes + 30 Cars</span>
            </div>
            <div className="floor-detail-item">
              <strong>B2:</strong> <span>60 Cars</span>
            </div>
            <div className="floor-detail-item">
              <strong>B3:</strong> <span>60 Cars</span>
            </div>
          </div>
        </div>
        <FloorSelector setSelectedFloor={setSelectedFloor} selectedFloor={selectedFloor} />
        <VehicleSelector 
          setVehicleType={setVehicleType} 
          vehicleType={vehicleType}
          isBikeParkingAvailable={isBikeParkingAvailable}
        />
        <div className="info-notice">
          <p>ℹ️ All bookings reset daily at 6:00 PM</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-parking-area">
        <div className="parking-header">
          <h3>
            Floor {selectedFloor} - {vehicleType} Parking
          </h3>
          <div className="legend">
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Available (Click to book)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color reserved"></div>
              <span>Booked (Click to release)</span>
            </div>
          </div>
        </div>
        <FloorPlan vehicleType={vehicleType} floor={selectedFloor} />
      </main>
    </div>
  );
};

export default ParkingSelectionPage;