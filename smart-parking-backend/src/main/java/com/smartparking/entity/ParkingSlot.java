package com.smartparking.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "parking_slot")
public class ParkingSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "slot_number", nullable = false, unique = true)
    private String slotNumber;

    @Column(nullable = false)
    private String type; // BIKE or CAR

    @Column(nullable = false)
    private String floor; // B1, B2, B3

    @Column(nullable = false)
    private boolean reserved;

    public ParkingSlot() {}

    public ParkingSlot(String slotNumber, String type, String floor, boolean reserved) {
        this.slotNumber = slotNumber;
        this.type = type;
        this.floor = floor;
        this.reserved = reserved;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSlotNumber() { return slotNumber; }
    public void setSlotNumber(String slotNumber) { this.slotNumber = slotNumber; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getFloor() { return floor; }
    public void setFloor(String floor) { this.floor = floor; }

    public boolean isReserved() { return reserved; }
    public void setReserved(boolean reserved) { this.reserved = reserved; }
}
