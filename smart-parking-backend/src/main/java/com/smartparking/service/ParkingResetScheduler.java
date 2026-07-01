package com.smartparking.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ParkingResetScheduler {

    private final ParkingSlotService parkingSlotService;

    public ParkingResetScheduler(ParkingSlotService parkingSlotService) {
        this.parkingSlotService = parkingSlotService;
    }

    // Reset all parking slots daily at 6:00 PM (18:00)
    // cron expression: second, minute, hour, day, month, weekday
    @Scheduled(cron = "0 0 18 * * *")
    public void resetAllParkingSlots() {
        System.out.println("⏰ Starting daily 6 PM parking reset...");
        parkingSlotService.resetAllSlots();
    }
}
