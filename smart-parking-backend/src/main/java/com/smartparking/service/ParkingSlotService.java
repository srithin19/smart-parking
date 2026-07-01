package com.smartparking.service;

import com.smartparking.dto.SlotWithBookingDTO;
import com.smartparking.entity.Booking;
import com.smartparking.entity.ParkingSlot;
import com.smartparking.repository.BookingRepository;
import com.smartparking.repository.ParkingSlotRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParkingSlotService {

    private final ParkingSlotRepository slotRepository;
    private final BookingRepository bookingRepository;

    public ParkingSlotService(ParkingSlotRepository slotRepository, BookingRepository bookingRepository) {
        this.slotRepository = slotRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<SlotWithBookingDTO> getAllSlots() {
        return slotRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<SlotWithBookingDTO> getSlotsByFloor(String floor) {
        return slotRepository.findByFloor(floor).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<SlotWithBookingDTO> getSlotsByFloorAndType(String floor, String type) {
        return slotRepository.findByFloorAndType(floor, type).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public SlotWithBookingDTO bookSlot(Long slotId, String userName) {
        ParkingSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));
        
        if (slot.isReserved()) {
            throw new RuntimeException("Slot is already booked");
        }

        // Mark slot as reserved
        slot.setReserved(true);
        slotRepository.save(slot);

        // Create booking record
        Booking booking = new Booking(userName, slot.getId(), slot.getSlotNumber(), 
                                     slot.getFloor(), slot.getType());
        bookingRepository.save(booking);

        return mapToDTO(slot);
    }

    @Transactional
    public SlotWithBookingDTO releaseSlot(Long slotId) {
        ParkingSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        slot.setReserved(false);
        slotRepository.save(slot);

        // Delete booking record
        bookingRepository.deleteBySlotId(slotId);

        return mapToDTO(slot);
    }

    @Transactional
    public void resetAllSlots() {
        List<ParkingSlot> allSlots = slotRepository.findAll();
        allSlots.forEach(slot -> slot.setReserved(false));
        slotRepository.saveAll(allSlots);
        
        // Clear all bookings
        bookingRepository.deleteAll();
        
        System.out.println("✅ All parking slots have been reset at 6 PM");
    }

    private SlotWithBookingDTO mapToDTO(ParkingSlot slot) {
        Optional<Booking> booking = bookingRepository.findBySlotId(slot.getId());
        return new SlotWithBookingDTO(
                slot.getId(),
                slot.getSlotNumber(),
                slot.getType(),
                slot.getFloor(),
                slot.isReserved(),
                booking.map(Booking::getUserName).orElse(null),
                booking.map(Booking::getBookedAt).orElse(null)
        );
    }
}
