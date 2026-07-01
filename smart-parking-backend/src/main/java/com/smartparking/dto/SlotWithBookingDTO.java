package com.smartparking.dto;

import java.time.LocalDateTime;

public class SlotWithBookingDTO {
    private Long id;
    private String slotNumber;
    private String type;
    private String floor;
    private boolean reserved;
    private String bookedBy;
    private LocalDateTime bookedAt;

    public SlotWithBookingDTO(Long id, String slotNumber, String type, String floor, 
                              boolean reserved, String bookedBy, LocalDateTime bookedAt) {
        this.id = id;
        this.slotNumber = slotNumber;
        this.type = type;
        this.floor = floor;
        this.reserved = reserved;
        this.bookedBy = bookedBy;
        this.bookedAt = bookedAt;
    }

    // Getters and Setters
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

    public String getBookedBy() { return bookedBy; }
    public void setBookedBy(String bookedBy) { this.bookedBy = bookedBy; }

    public LocalDateTime getBookedAt() { return bookedAt; }
    public void setBookedAt(LocalDateTime bookedAt) { this.bookedAt = bookedAt; }
}
