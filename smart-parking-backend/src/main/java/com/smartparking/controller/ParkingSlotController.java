package com.smartparking.controller;

import com.smartparking.dto.BookingRequest;
import com.smartparking.dto.SlotWithBookingDTO;
import com.smartparking.service.ParkingSlotService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "*")
public class ParkingSlotController {

    private final ParkingSlotService service;

    public ParkingSlotController(ParkingSlotService service) {
        this.service = service;
    }

    @GetMapping
    public List<SlotWithBookingDTO> getAllSlots() {
        return service.getAllSlots();
    }

    @GetMapping("/{floor}")
    public List<SlotWithBookingDTO> getSlotsByFloor(@PathVariable String floor) {
        return service.getSlotsByFloor(floor.toUpperCase());
    }

    @GetMapping("/{floor}/{type}")
    public List<SlotWithBookingDTO> getSlotsByFloorAndType(
            @PathVariable String floor,
            @PathVariable String type) {
        return service.getSlotsByFloorAndType(floor.toUpperCase(), type.toUpperCase());
    }

    @PostMapping("/{id}/book")
    public SlotWithBookingDTO bookSlot(@PathVariable Long id, @RequestBody BookingRequest request) {
        return service.bookSlot(id, request.getUserName());
    }

    @PostMapping("/{id}/release")
    public SlotWithBookingDTO releaseSlot(@PathVariable Long id) {
        return service.releaseSlot(id);
    }

    @PostMapping("/reset")
    public String resetAllSlots() {
        service.resetAllSlots();
        return "All parking slots have been reset";
    }
}
