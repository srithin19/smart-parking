package com.smartparking.service;

import com.smartparking.entity.ParkingSlot;
import com.smartparking.repository.ParkingSlotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingSlotService {

    private final ParkingSlotRepository repository;

    public ParkingSlotService(ParkingSlotRepository repository) {
        this.repository = repository;
    }

    public List<ParkingSlot> getAllSlots() {
        return repository.findAll();
    }

    public List<ParkingSlot> getSlotsByFloor(String floor) {
        return repository.findByFloor(floor);
    }

    public ParkingSlot updateSlotStatus(Long id, boolean reserved) {
        ParkingSlot slot = repository.findById(id).orElseThrow();
        slot.setReserved(reserved);
        return repository.save(slot);
    }
}
