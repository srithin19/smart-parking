package com.smartparking;

import com.smartparking.entity.ParkingSlot;
import com.smartparking.repository.ParkingSlotRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ParkingSlotRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                System.out.println("🚗 Generating parking slots...");

                // B1 - 200 bikes
                createSlots(repository, "B1", "BIKE", 200);

                // B2 - 100 cars, 30 bikes
                createSlots(repository, "B2", "CAR", 100);
                createSlots(repository, "B2", "BIKE", 30);

                // B3 - 100 cars, 30 bikes
                createSlots(repository, "B3", "CAR", 100);
                createSlots(repository, "B3", "BIKE", 30);

                System.out.println("✅ All parking slots generated successfully!");
            } else {
                System.out.println("ℹ️ Parking slots already exist. Skipping initialization.");
            }
        };
    }

    private void createSlots(ParkingSlotRepository repository, String floor, String type, int count) {
        for (int i = 1; i <= count; i++) {
            String slotNumber = String.format("%s-%s-%03d", floor, type.substring(0, 1), i);
            repository.save(new ParkingSlot(slotNumber, type, floor, false));
        }
    }
}
