# Quick Start Guide

## First Time Setup

### 1. Get Your Weather API Key
1. Go to [https://www.weatherapi.com/](https://www.weatherapi.com/)
2. Sign up for a free account
3. Copy your API key from the dashboard

### 2. Configure Backend
```bash
cd backend
npm install
```

Edit `backend/.env` and add your API key:
```
WEATHER_API_KEY=your_actual_api_key_here
PORT=5000
```

### 3. Configure Frontend
```bash
cd frontend
npm install
```

The `frontend/.env` file is already configured to point to `http://localhost:5000`

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
You should see: `Server is running on port 5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Your browser will open to `http://localhost:3000`

## Troubleshooting

### Backend won't start
- Make sure you've added your Weather API key to `backend/.env`
- Check if port 5000 is already in use
- Run `npm install` in the backend directory

### Frontend can't connect to backend
- Make sure the backend is running on port 5000
- Check that `frontend/.env` has `REACT_APP_API_URL=http://localhost:5000`
- Restart the frontend after changing `.env` files

### Weather data not loading
- Verify your Weather API key is correct in `backend/.env`
- Check the browser console for errors
- Check the backend terminal for error messages

## Production Deployment

### Backend
1. Set environment variables on your hosting platform
2. Deploy the `backend` folder
3. Note the deployed backend URL

### Frontend
1. Update `frontend/.env` with your production backend URL:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```
2. Build the frontend:
   ```bash
   npm run build
   ```
3. Deploy the `build` folder to your hosting platform

## Environment Variables Reference

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| WEATHER_API_KEY | WeatherAPI.com API key | abc123xyz456 |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000 |
