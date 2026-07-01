# 🚗 Smart Parking System

A modern 3-floor smart parking management system with a realistic floor plan visualization.

## 🎯 Features

- **3-Floor Parking Layout**
  - **B1**: 100 Bike Slots + 30 Car Slots
  - **B2**: 60 Car Slots
  - **B3**: 60 Car Slots

- **Realistic Floor Plan Visualization**
  - Entry and exit points with animated arrows
  - Central elevator/lift
  - Driving roads with lane markings
  - Organized parking bays (Bay A, B, C, D, E, F)
  - Visual size differentiation: Large rectangles for cars, small rectangles for bikes

- **Real-Time Booking System**
  - Click to book available slots (green)
  - Click to release booked slots (red)
  - User name tracking for each booking
  - Timestamp recording

- **Automated Daily Reset**
  - All bookings automatically reset at 6:00 PM daily

- **Modern UI Design**
  - Dark slate/navy gradient theme (#0f172a, #1e293b)
  - Industry-standard colors and typography (Inter font)
  - Responsive design
  - Smooth animations and transitions

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot
- **Database**: MySQL
- **ORM**: JPA/Hibernate
- **Scheduling**: Spring @Scheduled
- **Port**: 8080

### Frontend
- **Framework**: React
- **HTTP Client**: Axios
- **Styling**: CSS3 with Grid Layout
- **Port**: 3000

## 📋 Prerequisites

- Java 11 or higher
- Maven
- Node.js & npm
- MySQL Server

## 🚀 Getting Started

### 1. Database Setup

```sql
CREATE DATABASE smart_parking;
```

### 2. Backend Setup

```bash
cd smart-parking-backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

```bash
cd smart-parking-frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

### 4. Configure Database Connection

Edit `smart-parking-backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smart_parking
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## 📂 Project Structure

```
smart-parking/
├── smart-parking-backend/     # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/smartparking/
│   │   │   │   ├── controller/    # REST API endpoints
│   │   │   │   ├── entity/        # JPA entities
│   │   │   │   ├── repository/    # Data access layer
│   │   │   │   ├── service/       # Business logic
│   │   │   │   └── dto/           # Data transfer objects
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
│
└── smart-parking-frontend/       # React frontend
    ├── src/
    │   ├── api/                  # API integration
    │   ├── components/
    │   │   ├── FloorPlan/        # Realistic floor plan visualization
    │   │   ├── FloorSelector/    # Floor selection component
    │   │   └── VehicleSelector/  # Vehicle type selector
    │   └── pages/
    │       ├── LoginPage/        # User authentication
    │       ├── RegisterPage/     # User registration
    │       └── ParkingSelectionPage/  # Main parking interface
    └── package.json
```

## 🎨 Color Scheme

- **Background**: Dark slate (#0f172a → #1e293b)
- **Available Slots**: Green (#22c55e → #15803d)
- **Booked Slots**: Red (#ef4444 → #b91c1c)
- **Primary Accent**: Blue (#3b82f6 → #2563eb)
- **Elevator**: Purple (#8b5cf6)
- **Roads**: Gray (#475569) with yellow markings (#fbbf24)

## 📱 Usage

1. **Login/Register** - Create an account or login
2. **Select Floor** - Choose B1, B2, or B3
3. **Select Vehicle Type** - Choose Car or Bike (Bikes only on B1)
4. **View Floor Plan** - See the realistic parking layout with roads, entry/exit, and elevator
5. **Book Slot** - Click any green (available) slot to book
6. **Release Slot** - Click any red (booked) slot to release
7. **Auto-Reset** - All bookings reset automatically at 6 PM daily

## 📝 API Endpoints

- `GET /api/slots/floor/{floor}/type/{type}` - Get slots by floor and vehicle type
- `POST /api/slots/{id}/book` - Book a parking slot
- `POST /api/slots/{id}/release` - Release a parking slot
- `GET /api/slots/reset` - Manually reset all slots
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

## 🔄 Automated Features

- **Daily Reset**: All parking slots reset at 6:00 PM (18:00) daily
- **Data Initialization**: Empty database is automatically populated with parking slots on first run

## 🐛 Troubleshooting

- **Backend won't start**: Check MySQL is running and credentials are correct
- **Frontend shows "Loading"**: Ensure backend is running on port 8080
- **CORS errors**: Backend has CORS configured for localhost:3000

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

srithin19

## 🌟 Features Coming Soon

- Mobile app version
- Payment integration
- Reservation system
- Admin dashboard
- Analytics and reporting
