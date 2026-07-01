# Smart Parking Lot System - Implementation Guide

## 🎯 System Overview

This is a complete Smart Parking Lot management system with **3 basement floors (B1, B2, B3)** designed to handle both bike and car parking with real-time booking functionality.

---

## 🏢 Floor Structure

### **B1 (Basement 1)**

- **50 Bike Parking Slots** (B1-B-001 to B1-B-050)
- **50 Car Parking Slots** (B1-C-001 to B1-C-050)
- Total: 100 slots

### **B2 (Basement 2)**

- **100 Car Parking Slots** (B2-C-001 to B2-C-100)
- Total: 100 slots

### **B3 (Basement 3)**

- **100 Car Parking Slots** (B3-C-001 to B3-C-100)
- Total: 100 slots

**Total System Capacity**: 50 bikes + 250 cars

---

## ✨ Key Features

### 1. **Real-Time Booking System**

- Users can click on available (green) parking slots to book them
- Booking requires user name entry
- Each booking records the person's name and timestamp

### 2. **Color-Coded Slots**

- 🟢 **Green**: Available (Click to book)
- 🔴 **Red**: Booked (Click to release)
- Hover over slots to see booking details

### 3. **Daily Auto-Reset**

- All parking slots automatically become available at **6:00 PM daily**
- All bookings are cleared automatically
- Simulates daily parking usage pattern

### 4. **Floor-Specific Vehicle Types**

- **B1**: Both bikes and cars
- **B2 & B3**: Cars only (bike option disabled)
- Smart UI automatically handles vehicle type selection

### 5. **Clean Modern UI**

- Gradient background with professional styling
- Responsive design for all screen sizes
- Interactive animations on hover
- Modal dialog for booking confirmation
- Real-time slot status updates

---

## 🛠️ Backend Implementation

### **New Entities Created**

#### 1. **Booking Entity**

```java
- id: Long
- userName: String (person who booked)
- slotId: Long (reference to parking slot)
- slotNumber: String (slot identifier)
- bookedAt: LocalDateTime (booking timestamp)
- floor: String (B1/B2/B3)
- vehicleType: String (CAR/BIKE)
```

#### 2. **Updated ParkingSlot Entity**

- Already has: id, slotNumber, type, floor, reserved

### **New Services**

#### 1. **ParkingSlotService** (Enhanced)

- `bookSlot(slotId, userName)` - Books a slot with user name
- `releaseSlot(slotId)` - Releases a booked slot
- `resetAllSlots()` - Resets all slots to available
- `getSlotsByFloorAndType()` - Returns slots with booking info

#### 2. **ParkingResetScheduler**

- Scheduled task using `@Scheduled(cron = "0 0 18 * * *")`
- Runs daily at 6:00 PM
- Calls `resetAllSlots()` to clear all bookings

### **API Endpoints**

```
GET  /api/slots                     - Get all slots
GET  /api/slots/{floor}             - Get slots by floor
GET  /api/slots/{floor}/{type}      - Get slots by floor and vehicle type
POST /api/slots/{id}/book           - Book a slot (requires userName in body)
POST /api/slots/{id}/release        - Release a booked slot
POST /api/slots/reset               - Manually reset all slots (admin)
```

### **Database Schema Updates**

New table: `bookings`

```sql
CREATE TABLE bookings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    slot_id BIGINT NOT NULL,
    slot_number VARCHAR(50) NOT NULL,
    booked_at DATETIME NOT NULL,
    floor VARCHAR(10) NOT NULL,
    vehicle_type VARCHAR(10) NOT NULL
);
```

---

## 🎨 Frontend Implementation

### **Enhanced Components**

#### 1. **FloorMap Component**

- Displays parking slots in a responsive grid
- Click handlers for booking/releasing slots
- Modal dialog for user name input
- Real-time data fetching
- Shows booking information on hover
- Visual feedback with animations

#### 2. **VehicleSelector Component**

- Disables bike option on B2/B3 floors
- Shows "B1 Only" label when bike parking unavailable
- Grayscale effect for disabled options

#### 3. **FloorSelector Component**

- Highlights active floor in green
- Smooth transitions and hover effects

#### 4. **ParkingSelectionPage**

- Floor information card showing capacity
- Auto-switches to car when selecting B2/B3 with bike selected
- Daily reset notification displayed
- Enhanced header with legends

### **User Interaction Flow**

1. **Select Floor** (B1/B2/B3)
2. **Select Vehicle Type** (Car or Bike - if available)
3. **View Floor Map** with color-coded slots
4. **Click Green Slot** to book
5. **Enter Your Name** in modal dialog
6. **Confirm Booking** - Slot turns red
7. **Click Red Slot** to release (optional)

---

## 🚀 How to Run the System

### **Backend (Spring Boot)**

1. **Ensure MySQL is running**

   ```bash
   # Database: smart_parking
   # Username: root
   # Password: root123
   ```

2. **Navigate to backend directory**

   ```bash
   cd smart-parking-backend
   ```

3. **Run the application**

   ```bash
   mvn spring-boot:run
   ```

4. **Backend will start on** `http://localhost:8080`

### **Frontend (React)**

1. **Navigate to frontend directory**

   ```bash
   cd smart-parking-frontend
   ```

2. **Install dependencies** (if not done)

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Frontend will open on** `http://localhost:3000`

---

## 📋 Testing the Features

### **Test Booking System**

1. Open the app at `http://localhost:3000`
2. Login/Register if required
3. Select B1 floor
4. Click any green car slot
5. Enter your name (e.g., "John Doe")
6. Click "Confirm Booking"
7. Verify slot turns red
8. Hover over the red slot to see your name and booking time

### **Test Floor Restrictions**

1. Select B1 floor - both Car and Bike should be available
2. Select B2 floor - Bike option should be disabled (grayed out)
3. Select B3 floor - Bike option should be disabled (grayed out)

### **Test Auto-Reset**

1. Book several slots
2. Change system time to 6:00 PM or wait until 6:00 PM
3. Check backend console logs for reset message
4. Refresh frontend - all slots should be green

### **Test Manual Reset** (Optional)

```bash
curl -X POST http://localhost:8080/api/slots/reset
```

---

## 🎨 UI/UX Highlights

- **Modern gradient background** (Purple to Blue)
- **Fixed sidebar** with all controls
- **Responsive grid layout** for parking slots
- **Smooth animations** on hover and click
- **Professional modal dialog** for booking
- **Color-coded legend** for easy understanding
- **Mobile-responsive design**
- **Accessibility features** (tooltips, clear labels)

---

## 🔒 Data Stored for Each Booking

- ✅ User name (who booked)
- ✅ Parking slot number
- ✅ Floor location
- ✅ Vehicle type (Car/Bike)
- ✅ Booking timestamp
- ✅ Slot ID for quick lookups

---

## 📊 System Behavior

### **Booking Flow**

```
User clicks green slot
  → Modal opens
  → User enters name
  → POST /api/slots/{id}/book
  → Booking record created
  → Slot marked as reserved
  → UI updates (slot turns red)
```

### **Release Flow**

```
User clicks red slot
  → Confirmation dialog
  → POST /api/slots/{id}/release
  → Booking record deleted
  → Slot marked as available
  → UI updates (slot turns green)
```

### **Daily Reset Flow**

```
6:00 PM arrives
  → Scheduler triggers
  → All slots set to available
  → All booking records deleted
  → Console logs confirmation
  → Next user refresh shows all green
```

---

## 🆘 Troubleshooting

### **Backend Issues**

- Ensure MySQL is running on port 3306
- Check database credentials in `application.properties`
- Verify `smart_parking` database exists

### **Frontend Issues**

- Check if backend is running on port 8080
- Clear browser cache if slots not updating
- Check browser console for errors

### **Scheduling Not Working**

- Verify `@EnableScheduling` is in main application class
- Check system time is correct
- Look for scheduler logs in console

---

## 📝 File Structure

```
smart-parking-backend/
├── entity/
│   ├── Booking.java (NEW)
│   ├── ParkingSlot.java
│   └── User.java
├── repository/
│   ├── BookingRepository.java (NEW)
│   ├── ParkingSlotRepository.java
│   └── UserRepository.java
├── service/
│   ├── ParkingSlotService.java (UPDATED)
│   └── ParkingResetScheduler.java (NEW)
├── controller/
│   └── ParkingSlotController.java (UPDATED)
├── dto/
│   ├── BookingRequest.java (NEW)
│   └── SlotWithBookingDTO.java (NEW)
└── DataInitializer.java (UPDATED)

smart-parking-frontend/
├── components/
│   ├── FloorMap/ (UPDATED)
│   ├── FloorSelector/ (UPDATED)
│   └── VehicleSelector/ (UPDATED)
├── pages/
│   └── ParkingSelectionPage/ (UPDATED)
└── api/
    └── parkingApi.js (UPDATED)
```

---

## 🎯 Success Criteria

✅ B1 has both bike and car parking  
✅ B2 and B3 have only car parking  
✅ Green slots are available for booking  
✅ Red slots show they are booked  
✅ User name is captured during booking  
✅ Booking time is recorded  
✅ Daily reset at 6 PM works automatically  
✅ Clean, modern UI with smooth interactions  
✅ Responsive design for all devices  
✅ Real-time updates after booking/releasing

---

## 🚀 Future Enhancements (Optional)

- Email notifications on booking
- Payment integration
- Extended booking (multi-day)
- Admin dashboard for analytics
- QR code for parking slot access
- Mobile app version
- Parking space search/filter
- Reserved parking for regulars

---

**System Status**: ✅ Fully Implemented and Ready to Use!

For any questions or issues, check the console logs or contact the development team.
