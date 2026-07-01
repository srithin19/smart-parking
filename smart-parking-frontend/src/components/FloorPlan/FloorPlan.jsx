import React, { useState, useEffect } from "react";
import { getSlotsByFloorAndType, bookSlot, releaseSlot } from "../../api/parkingApi";
import "./FloorPlan.css";

const FloorPlan = ({ vehicleType, floor }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userName, setUserName] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const fetchSlots = async () => {
    if (!floor || !vehicleType) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const type = vehicleType === "Car" ? "CAR" : "BIKE";
      const data = await getSlotsByFloorAndType(floor, type);
      setSlots(data);
    } catch (err) {
      console.error("Error fetching slots:", err);
      setError("Failed to load parking slots. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floor, vehicleType]);

  const handleSlotClick = (slot) => {
    if (!slot.reserved) {
      setSelectedSlot(slot);
      setShowModal(true);
      setUserName("");
    }
  };

  const handleBooking = async () => {
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }

    setBookingLoading(true);
    try {
      await bookSlot(selectedSlot.id, userName.trim());
      setShowModal(false);
      setSelectedSlot(null);
      setUserName("");
      await fetchSlots();
      alert(`Parking slot ${selectedSlot.slotNumber} booked successfully!`);
    } catch (err) {
      console.error("Booking error:", err);
      alert(err.response?.data?.message || "Failed to book slot. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleRelease = async (slot) => {
    if (window.confirm(`Release ${slot.slotNumber}?`)) {
      try {
        await releaseSlot(slot.id);
        await fetchSlots();
        alert(`Slot ${slot.slotNumber} has been released`);
      } catch (err) {
        console.error("Release error:", err);
        alert("Failed to release slot. Please try again.");
      }
    }
  };

  const getSlotDisplayNumber = (slotNumber) => {
    const parts = slotNumber.split("-");
    return parts[parts.length - 1];
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  // Layout configuration for B1 (100 bikes + 30 cars)
  const getB1Layout = () => {
    const bikeSlots = slots.filter(s => s.type === "BIKE");
    const carSlots = slots.filter(s => s.type === "CAR");
    
    if (vehicleType === "Bike") {
      return {
        leftBay: bikeSlots.slice(0, 25),
        rightBay: bikeSlots.slice(25, 50),
        topBay: bikeSlots.slice(50, 75),
        bottomBay: bikeSlots.slice(75, 100)
      };
    } else {
      return {
        leftBay: carSlots.slice(0, 10),
        rightBay: carSlots.slice(10, 20),
        bottomBay: carSlots.slice(20, 30)
      };
    }
  };

  // Layout for B2/B3 (60 cars each)
  const getCarLayout = () => {
    return {
      leftBay: slots.slice(0, 20),
      rightBay: slots.slice(20, 40),
      bottomBay: slots.slice(40, 60)
    };
  };

  if (loading) {
    return (
      <div className="floor-plan-loading">
        <div className="loading-spinner"></div>
        <p>Loading floor plan...</p>
      </div>
    );
  }

  if (error) {
    return <div className="floor-plan-error"><p>{error}</p></div>;
  }

  if (slots.length === 0) {
    return (
      <div className="floor-plan-empty">
        <p>No {vehicleType.toLowerCase()} parking available on {floor}</p>
      </div>
    );
  }

  const layout = floor === "B1" ? getB1Layout() : getCarLayout();

  return (
    <>
      <div className="floor-plan-container">
        {/* Floor Plan Header */}
        <div className="floor-plan-header">
          <div className="floor-info">
            <h4>Floor Plan - {floor}</h4>
            <span className="capacity-badge">
              {vehicleType === "Bike" ? "100 Bikes" : floor === "B1" ? "30 Cars" : "60 Cars"}
            </span>
          </div>
        </div>

        {/* Main Floor Plan SVG */}
        <div className="floor-plan-map">
          {/* Entry Point */}
          <div className="entry-point">
            <div className="entry-arrow">↓</div>
            <span>ENTRY</span>
          </div>

          {/* Elevator */}
          <div className="elevator-box">
            <div className="elevator-icon">🛗</div>
            <span>LIFT</span>
          </div>

          {/* Left Parking Bay */}
          <div className="parking-bay left-bay">
            <div className="bay-label">BAY A</div>
            <div className="parking-slots">
              {layout.leftBay && layout.leftBay.map((slot) => (
                <div
                  key={slot.id}
                  className={`parking-slot ${vehicleType === 'CAR' ? 'car-slot' : 'bike-slot'} ${!slot.reserved ? "available" : "reserved"}`}
                  onClick={() => !slot.reserved ? handleSlotClick(slot) : handleRelease(slot)}
                  title={
                    slot.reserved
                      ? `${slot.slotNumber}\nBooked by: ${slot.bookedBy}\nTime: ${formatDateTime(slot.bookedAt)}`
                      : `${slot.slotNumber} - Available`
                  }
                >
                  <div className="slot-number">{getSlotDisplayNumber(slot.slotNumber)}</div>
                  {slot.reserved && <div className="slot-booked">🚗</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Center Road */}
          <div className="center-road">
            <div className="road-marking"></div>
            <div className="road-marking"></div>
            <div className="road-marking"></div>
            <div className="road-arrow">↓</div>
          </div>

          {/* Right Parking Bay */}
          <div className="parking-bay right-bay">
            <div className="bay-label">BAY B</div>
            <div className="parking-slots">
              {layout.rightBay && layout.rightBay.map((slot) => (
                <div
                  key={slot.id}
                  className={`parking-slot ${vehicleType === 'CAR' ? 'car-slot' : 'bike-slot'} ${!slot.reserved ? "available" : "reserved"}`}
                  onClick={() => !slot.reserved ? handleSlotClick(slot) : handleRelease(slot)}
                  title={
                    slot.reserved
                      ? `${slot.slotNumber}\nBooked by: ${slot.bookedBy}\nTime: ${formatDateTime(slot.bookedAt)}`
                      : `${slot.slotNumber} - Available`
                  }
                >
                  <div className="slot-number">{getSlotDisplayNumber(slot.slotNumber)}</div>
                  {slot.reserved && <div className="slot-booked">🚗</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Road */}
          <div className="bottom-road">
            <div className="road-horizontal-marking"></div>
          </div>

          {/* Bottom Parking Bay */}
          {(vehicleType === "Car" || (floor === "B1" && vehicleType === "Bike")) && (
            <div className="parking-bay bottom-bay">
              <div className="bay-label">BAY {vehicleType === "Bike" ? "C & D" : "C"}</div>
              <div className="parking-slots horizontal">
                {layout.bottomBay && layout.bottomBay.map((slot) => (
                  <div
                    key={slot.id}
                    className={`parking-slot ${vehicleType === 'CAR' ? 'car-slot' : 'bike-slot'} ${!slot.reserved ? "available" : "reserved"}`}
                    onClick={() => !slot.reserved ? handleSlotClick(slot) : handleRelease(slot)}
                    title={
                      slot.reserved
                        ? `${slot.slotNumber}\nBooked by: ${slot.bookedBy}\nTime: ${formatDateTime(slot.bookedAt)}`
                        : `${slot.slotNumber} - Available`
                    }
                  >
                    <div className="slot-number">{getSlotDisplayNumber(slot.slotNumber)}</div>
                    {slot.reserved && <div className="slot-booked">🚗</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Parking Bay (Bikes only on B1) */}
          {floor === "B1" && vehicleType === "Bike" && layout.topBay && (
            <div className="parking-bay top-bay">
              <div className="bay-label">BAY E & F</div>
              <div className="parking-slots horizontal">
                {layout.topBay.map((slot) => (
                  <div
                    key={slot.id}
                    className={`parking-slot ${vehicleType === 'CAR' ? 'car-slot' : 'bike-slot'} ${!slot.reserved ? "available" : "reserved"}`}
                    onClick={() => !slot.reserved ? handleSlotClick(slot) : handleRelease(slot)}
                    title={
                      slot.reserved
                        ? `${slot.slotNumber}\nBooked by: ${slot.bookedBy}\nTime: ${formatDateTime(slot.bookedAt)}`
                        : `${slot.slotNumber} - Available`
                    }
                  >
                    <div className="slot-number">{getSlotDisplayNumber(slot.slotNumber)}</div>
                    {slot.reserved && <div className="slot-booked">🏍️</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exit Point */}
          <div className="exit-point">
            <div className="exit-arrow">↑</div>
            <span>EXIT</span>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book Parking Slot</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p className="slot-info-text">
                <strong>Slot Number:</strong> {selectedSlot?.slotNumber}
              </p>
              <p className="slot-info-text">
                <strong>Floor:</strong> {selectedSlot?.floor}
              </p>
              <p className="slot-info-text">
                <strong>Type:</strong> {selectedSlot?.type}
              </p>
              
              <div className="form-group">
                <label htmlFor="userName">Your Name:</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleBooking()}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-cancel" 
                onClick={() => setShowModal(false)}
                disabled={bookingLoading}
              >
                Cancel
              </button>
              <button 
                className="btn-confirm" 
                onClick={handleBooking}
                disabled={bookingLoading}
              >
                {bookingLoading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloorPlan;
