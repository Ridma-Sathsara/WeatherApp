# Weather App

A full-stack weather application with React frontend and Node.js/Express backend.

## Project Structure

```
Weather-App/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # React source code
│   │   ├── components/      # React components
│   │   │   ├── weather.js
│   │   │   └── weather.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env                 # Frontend environment variables (not in git)
│   ├── .env.example         # Frontend environment template
│   └── package.json
│
├── backend/                 # Express backend server
│   ├── server.js           # Main server file
│   ├── .env                # Backend environment variables (not in git)
│   ├── .env.example        # Backend environment template
│   └── package.json
│
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Weather API key from [WeatherAPI.com](https://www.weatherapi.com/)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your Weather API key to the `.env` file:
     ```
     WEATHER_API_KEY=your_actual_api_key_here
     PORT=5000
     ```

4. Start the backend server:
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - The `.env` file should already exist
   - Verify it points to your backend:
     ```
     REACT_APP_API_URL=http://localhost:5000
     ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## Running the Full Application

1. **Start Backend** (in one terminal):
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend** (in another terminal):
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Backend API

- **GET /** - API information
- **GET /api/health** - Health check
- **GET /api/weather?city={city_name}** - Get weather data for a city

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `WEATHER_API_KEY` - Your WeatherAPI.com API key

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000)

## Features

- 🌤️ Current weather information
- 📅 3-day weather forecast
- 🌡️ Temperature, humidity, wind speed
- ☀️ UV index with safety levels
- 🌧️ Chance of rain
- ⏰ Local time display
- 🎨 Beautiful animated weather icons
- ✨ Starry background animation

## Technologies Used

### Frontend
- React 18
- Material-UI (MUI)
- Axios
- React Animated Weather
- SASS

### Backend
- Node.js
- Express
- CORS
- Axios
- dotenv

## License

ISC
