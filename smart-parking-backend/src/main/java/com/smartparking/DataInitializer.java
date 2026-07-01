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

                // B1 - Bike and Car parking (100 bikes + 30 cars)
                createSlots(repository, "B1", "BIKE", 100);
                createSlots(repository, "B1", "CAR", 30);

                // B2 - Only Car parking (60 cars)
                createSlots(repository, "B2", "CAR", 60);

                // B3 - Only Car parking (60 cars)
                createSlots(repository, "B3", "CAR", 60);

                System.out.println("✅ All parking slots generated successfully!");
                System.out.println("   B1: 100 bikes + 30 cars");
                System.out.println("   B2: 60 cars");
                System.out.println("   B3: 60 cars");
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
