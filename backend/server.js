const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Weather API endpoint
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Weather API key not configured' });
    }

    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    
    if (error.response) {
      res.status(error.response.status).json({ 
        error: error.response.data.error?.message || 'Error fetching weather data' 
      });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Weather App Backend is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Weather App API', 
    endpoints: {
      health: '/api/health',
      weather: '/api/weather?city=<city_name>'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
