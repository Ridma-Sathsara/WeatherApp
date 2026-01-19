# Weather App Backend

Express.js backend server that proxies weather API requests.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your Weather API key from [WeatherAPI.com](https://www.weatherapi.com/)

3. Run the server:
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### GET /
Returns API information and available endpoints.

**Response:**
```json
{
  "message": "Weather App API",
  "endpoints": {
    "health": "/api/health",
    "weather": "/api/weather?city=<city_name>"
  }
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Weather App Backend is running"
}
```

### GET /api/weather
Get weather data for a specific city.

**Query Parameters:**
- `city` (required) - City name

**Example:**
```
GET /api/weather?city=London
```

**Success Response (200):**
```json
{
  "location": {
    "name": "London",
    "country": "United Kingdom",
    "localtime": "2024-01-20 12:00"
  },
  "current": {
    "temp_c": 15,
    "humidity": 70,
    "wind_kph": 20,
    "uv": 3,
    "condition": {
      "text": "Partly cloudy"
    }
  },
  "forecast": {
    "forecastday": [...]
  }
}
```

**Error Responses:**
- `400` - Missing city parameter
- `500` - API key not configured or weather API error

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| PORT | Server port | No | 5000 |
| WEATHER_API_KEY | WeatherAPI.com API key | Yes | - |

## Dependencies

- **express** - Web framework
- **cors** - Enable CORS
- **dotenv** - Environment variable management
- **axios** - HTTP client for API requests
- **nodemon** (dev) - Auto-reload during development
