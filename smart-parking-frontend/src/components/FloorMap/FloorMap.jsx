import React, { useState, useEffect } from "react";
import { getSlotsByFloorAndType, bookSlot, releaseSlot } from "../../api/parkingApi";
import "./FloorMap.css";

const FloorMap = ({ vehicleType, floor }) => {
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
      await fetchSlots(); // Refresh the slots
      alert(`Parking slot ${selectedSlot.slotNumber} booked successfully!`);
    } catch (err) {
      console.error("Booking error:", err);
      alert(err.response?.data?.message || "Failed to book slot. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleRelease = async (slot) => {
    if (window.confirm(`Are you sure you want to release ${slot.slotNumber}?`)) {
      try {
        await releaseSlot(slot.id);
        await fetchSlots(); // Refresh the slots
        alert(`Slot ${slot.slotNumber} has been released`);
      } catch (err) {
        console.error("Release error:", err);
        alert("Failed to release slot. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading parking slots...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="no-slots-container">
        <p>No {vehicleType.toLowerCase()} parking available on {floor}</p>
      </div>
    );
  }

  const getSlotDisplayNumber = (slotNumber) => {
    const parts = slotNumber.split("-");
    return parts[parts.length - 1];
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  return (
    <>
      <div className={vehicleType === "Bike" ? "parking-grid bike-grid" : "parking-grid car-grid"}>
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`slot ${!slot.reserved ? "available" : "reserved"}`}
            onClick={() => !slot.reserved ? handleSlotClick(slot) : handleRelease(slot)}
            title={
              slot.reserved
                ? `${slot.slotNumber}\nBooked by: ${slot.bookedBy}\nTime: ${formatDateTime(slot.bookedAt)}`
                : `${slot.slotNumber} - Available (Click to book)`
            }
          >
            <div className="slot-number">{getSlotDisplayNumber(slot.slotNumber)}</div>
            {slot.reserved && (
              <div className="slot-info">
                <div className="booked-by">{slot.bookedBy}</div>
              </div>
            )}
          </div>
        ))}
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
                  onKeyPress={(e) => e.key === 'Enter' && handleBooking()}
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

export default FloorMap;