# 🚀 Quick Start Guide - Smart Parking System

## Before You Start

### Prerequisites:

- ✅ Java 17 or higher installed
- ✅ Node.js 14+ and npm installed
- ✅ MySQL Server running
- ✅ Maven installed

---

## 📦 Database Setup

1. **Start MySQL** and create the database:

```sql
CREATE DATABASE smart_parking;
```

2. **Update credentials** (if different):
   - File: `smart-parking-backend/src/main/resources/application.properties`
   - Update: `username` and `password` if needed

---

## 🏃‍♂️ Running the Application

### Step 1: Start Backend

```powershell
cd smart-parking-backend
mvn clean install
mvn spring-boot:run
```

✅ Backend should start on `http://localhost:8080`  
✅ Watch console logs - it will auto-create database tables  
✅ You'll see: "✅ All parking slots generated successfully!"

### Step 2: Start Frontend

Open a NEW terminal/PowerShell window:

```powershell
cd smart-parking-frontend
npm install
npm start
```

✅ Frontend should open automatically at `http://localhost:3000`  
✅ If not, manually open: http://localhost:3000

---

## 🎯 Testing Your Implementation

### Test 1: Floor Configuration

1. Select **B1** → Should see both Car and Bike options ✅
2. Select **B2** → Bike option should be disabled (grayed) ✅
3. Select **B3** → Bike option should be disabled (grayed) ✅

### Test 2: Booking System

1. Select **B1** floor
2. Select **Car** vehicle
3. Click any **green slot**
4. Modal should open asking for name ✅
5. Enter your name (e.g., "John Doe")
6. Click **Confirm Booking**
7. Slot should turn **red** ✅
8. Hover over the red slot → Should show your name and time ✅

### Test 3: Release Booking

1. Click on any **red (booked) slot**
2. Confirmation dialog appears ✅
3. Click OK
4. Slot turns back to **green** ✅

### Test 4: Daily Reset (Manual Test)

```powershell
# In a new terminal, run:
curl -X POST http://localhost:8080/api/slots/reset
```

✅ All slots should turn green  
✅ Check backend console for reset message

### Test 5: Scheduled Reset (Automatic)

- Wait until 6:00 PM or temporarily change the cron expression
- All slots automatically reset to green
- Check backend console logs at 6 PM

---

## 🎨 What You Should See

### UI Features:

- 🟢 **Green Slots** = Available (clickable to book)
- 🔴 **Red Slots** = Booked (clickable to release)
- 📊 **Floor Info Card** on left sidebar showing floor details
- ⏰ **Daily Reset Notice** showing 6 PM reset info
- 🎯 **Clean Modern UI** with gradients and animations

### Backend Logs:

```
🚗 Generating parking slots...
✅ All parking slots generated successfully!
   B1: 50 bikes + 50 cars
   B2: 100 cars
   B3: 100 cars
```

At 6 PM:

```
⏰ Starting daily 6 PM parking reset...
✅ All parking slots have been reset at 6 PM
```

---

## 📱 User Journey

1. **Open App** → http://localhost:3000
2. **Login/Register** (if auth is implemented)
3. **Select Floor** (B1, B2, or B3)
4. **Select Vehicle** (Car or Bike if available)
5. **View Parking Map** with color-coded slots
6. **Click Green Slot** to book
7. **Enter Name** in modal
8. **Confirm** → Slot turns red
9. **Hover Red Slots** to see booking info
10. **Click Red Slot** to release (optional)

---

## 🔍 Verification Checklist

### Backend:

- [ ] MySQL database `smart_parking` created
- [ ] Backend runs without errors on port 8080
- [ ] Tables auto-created (parking_slot, bookings, users)
- [ ] Console shows slot generation message
- [ ] API endpoints responding

### Frontend:

- [ ] Frontend runs without errors on port 3000
- [ ] All floors (B1, B2, B3) visible
- [ ] Vehicle selector works
- [ ] Floor map displays slots
- [ ] Green/red colors working
- [ ] Click interactions working
- [ ] Modal dialog appears
- [ ] Bookings persist after refresh

### Features:

- [ ] B1 has both bike and car options
- [ ] B2/B3 only have car option (bike disabled)
- [ ] Booking requires name input
- [ ] Slots turn red after booking
- [ ] Booking info visible on hover
- [ ] Release functionality works
- [ ] UI is responsive and clean

---

## ⚠️ Common Issues & Solutions

### Issue: "Cannot connect to MySQL"

**Solution:**

- Ensure MySQL is running
- Check credentials in `application.properties`
- Verify database exists: `CREATE DATABASE smart_parking;`

### Issue: "Port 8080 already in use"

**Solution:**

- Kill process using port 8080
- Or change port in `application.properties`

### Issue: "Port 3000 already in use"

**Solution:**

- Kill process using port 3000
- Or press 'Y' when asked to use different port

### Issue: "Slots not updating after booking"

**Solution:**

- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache
- Check browser console for errors
- Verify backend is running

### Issue: "Bike option always disabled"

**Solution:**

- Make sure you're on B1 floor
- B2 and B3 don't support bikes (by design)

---

## 🎉 Success Indicators

You'll know everything is working when:

✅ Backend console shows parking slots generated  
✅ Frontend opens without errors  
✅ You can see the parking floor map  
✅ Slots are clickable and change color  
✅ Modal opens when clicking green slots  
✅ Booking stores your name  
✅ Red slots show who booked them  
✅ Floor restrictions work (B1: all, B2/B3: cars only)

---

## 📚 Additional Resources

- **Full Documentation**: `IMPLEMENTATION_GUIDE.md`
- **Summary**: `SUMMARY.md`
- **API Documentation**: Check backend controller classes

---

## 🆘 Need Help?

1. Check backend console for errors
2. Check browser console (F12) for frontend errors
3. Verify database connection
4. Ensure all dependencies installed
5. Review IMPLEMENTATION_GUIDE.md for detailed info

---

**Your Smart Parking System is Ready! 🎊**

Start by running both backend and frontend, then open http://localhost:3000 and start booking parking spots!
