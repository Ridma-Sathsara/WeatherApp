import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField, Button, Typography, Card, CardContent, CircularProgress, 
  Container, Box 
} from '@mui/material';
import { AcUnit, Opacity, Speed, WbSunny } from '@mui/icons-material'; // Import weather-related icons
import AnimatedWeather from 'react-animated-weather';
import './weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [uvIndex, setUvIndex] = useState(null);

  const apiKey = ''; // Replace with your API key

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
      );

      setWeather({
        ...response.data.current,
        chance_of_rain: response.data.forecast.forecastday[0].day.daily_chance_of_rain,
      });
      setForecast(response.data.forecast.forecastday);
      setUvIndex(response.data.current.uv);
      setLocalTime(response.data.location.localtime);
      setError('');
    } catch (err) {
      console.error('Error fetching weather data:', err.response ? err.response.data : err.message);
      setError('Error fetching weather data. Please try again.');
      setWeather(null);
      setForecast(null);
      setUvIndex(null);
      setLocalTime('');
    } finally {
      setLoading(false);
    }
  };

  // Map weather condition to the appropriate icon
  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    let iconName = 'CLEAR_DAY'; // Default to a sunny day icon
  
    if (conditionLower.includes('clear')) {
      iconName = 'CLEAR_DAY';
    } else if (conditionLower.includes('cloud')) {
      iconName = 'CLOUDY';
    } else if (conditionLower.includes('rain')) {
      iconName = 'RAIN';
    } else if (conditionLower.includes('sunny')) {
      iconName = 'CLEAR_DAY';
    } else if (conditionLower.includes('storm')) {
      iconName = 'PARTLY_CLOUDY_DAY';
    } else if (conditionLower.includes('fog')) {
      iconName = 'FOGGY';
    }
  
    return <AnimatedWeather icon={iconName} color="white" size={60} animate={true} />;
  };
  
  const getUvLevel = (uv) => {
    if (uv < 3) return { level: 'Low', color: 'green' };
    if (uv < 6) return { level: 'Moderate', color: 'yellow' };
    if (uv < 8) return { level: 'High', color: 'orange' };
    if (uv < 11) return { level: 'Very High', color: 'red' };
    return { level: 'Extreme', color: 'purple' };
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Starry Background */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      {/* Title at the top */}
      <div id="title">
        <span>Weather App</span>
      </div>
      <br />

      {/* Weather App Content */}
      <Container maxWidth="md" sx={{ zIndex: 2, position: 'relative', paddingTop: 7 }}>
        <TextField
          fullWidth
          label="Enter City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: 'transparent',
              color: 'white',
              borderRadius: '4px',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'white',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 1)',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 1)',
            }
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={getWeather}
          disabled={loading}
          sx={{
            marginBottom: 2,
            backgroundColor: 'transparent',
            border: '1px solid #FFFFFF',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#333333',
            },
            '&:disabled': {
              backgroundColor: 'transparent',
              borderColor: '#ddd',
              color: '#ddd',
            }
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Get Weather'}
        </Button>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        {weather && (
          <Card sx={{
            marginBottom: 2,
            backgroundColor: 'transparent',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(2px)',
            borderRadius: 2,
          }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Typography variant="h5" align="center">{city}</Typography>
              
              {/* Display Weather Icon */}
              {getWeatherIcon(weather.condition.text)}

              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AcUnit sx={{ marginRight: 1 }} /> Temperature: {weather.temp_c}°C
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Opacity sx={{ marginRight: 1 }} /> Humidity: {weather.humidity}%
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Speed sx={{ marginRight: 1 }} /> Wind Speed: {weather.wind_kph} kph
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getUvLevel(uvIndex).color,
                }}
              >
                <WbSunny sx={{ marginRight: 1 }} />
                UV Index: {uvIndex} ({getUvLevel(uvIndex).level})
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Chance of Rain: {weather.chance_of_rain || '0'}%
              </Typography>
              <Typography variant="body1">Local Time: {localTime}</Typography>
            </CardContent>
          </Card>
        )}
      </Container>

      {/* Forecast Container with Transparent Table */}
      <Container maxWidth="lg" sx={{ zIndex: 2, position: 'relative', paddingTop: 4 }}>
        {forecast && (
          <Box sx={{ marginTop: 2, marginBottom: 10, overflowY: 'off' }}>
            <table style={{
              width: '100%',
              backgroundColor: 'transparent',
              color: 'white',
              borderCollapse: 'collapse',
              backdropFilter: 'blur(5px)',
            }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px', borderBottom: '1px solid #fff' }}>Date</th>
                  <th style={{ padding: '10px', borderBottom: '1px solid #fff' }}>Weather</th>
                  <th style={{ padding: '10px', borderBottom: '1px solid #fff' }}>Temperature</th>
                  <th style={{ padding: '10px', borderBottom: '1px solid #fff' }}>Chance of Rain</th>
                </tr>
              </thead>
              <tbody>
                {forecast.map((day) => (
                  <tr key={day.date}>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      {new Date(day.date).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      {day.day.condition.text}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      {day.day.avgtemp_c}°C
                    </td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      {day.day.daily_chance_of_rain}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Weather;
