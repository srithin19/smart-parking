package com.smartparking.controller;

import com.smartparking.entity.ParkingSlot;
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
    public List<ParkingSlot> getAllSlots() {
        return service.getAllSlots();
    }

    @GetMapping("/{floor}")
    public List<ParkingSlot> getSlotsByFloor(@PathVariable String floor) {
        return service.getSlotsByFloor(floor.toUpperCase());
    }

    @PostMapping("/{id}/reserve")
    public ParkingSlot reserveSlot(@PathVariable Long id) {
        return service.updateSlotStatus(id, true);
    }

    @PostMapping("/{id}/release")
    public ParkingSlot releaseSlot(@PathVariable Long id) {
        return service.updateSlotStatus(id, false);
    }
}
