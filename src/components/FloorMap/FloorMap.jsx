import React from "react";
import "./FloorMap.css";

const FloorMap = ({ vehicleType }) => {
  const generateSlots = () => {
    const parkingSlots = [];
    let totalSlots = 0;

    // Assign grid sizes based on vehicle type
    if (vehicleType === "bike") {
      totalSlots = 30; // Fixed 30 bike parking slots
    } else {
      totalSlots = 100; // Fixed 100 car parking slots
    }

    // Generate slots (availability simulated)
    for (let i = 1; i <= totalSlots; i++) {
      const isAvailable = i % 5 !== 0; // Simulate availability: Every 5th slot is booked
      parkingSlots.push({
        id: i,
        isAvailable, // True for available, false for reserved
        type: vehicleType, // "bike" or "car"
      });
    }

    return parkingSlots;
  };

  const slotsList = generateSlots();

  return (
    <div
      className={
        vehicleType === "bike" ? "parking-grid bike-grid" : "parking-grid car-grid"
      }
    >
      {slotsList.map((slot) => (
        <div
          key={slot.id}
          className={`slot ${slot.isAvailable ? "available" : "reserved"}`}
        >
          {slot.id}
        </div>
      ))}
    </div>
  );
};

export default FloorMap;