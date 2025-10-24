# Frontend-Backend Connection Guide

## Overview

This application uses:
- **Frontend**: React (Vite) on `http://localhost:8080`
- **Backend**: FastAPI on `http://localhost:8000`

## How They Connect

### 1. Environment Configuration

The `.env` file at the root contains:
```
VITE_API_URL=http://localhost:8000
```

This tells the frontend where to find the backend API.

### 2. API Service Layer

The frontend uses a centralized API service (`src/services/api.ts`) that:
- Automatically adds authentication tokens to requests
- Handles all HTTP methods (GET, POST, PUT, DELETE)
- Provides type-safe methods for all endpoints
- Manages errors and loading states

### 3. Backend CORS Configuration

The FastAPI backend must allow requests from the frontend. Check `backend/main.py` has CORS middleware:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Testing the Connection

### 1. Start Backend
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

### 2. Start Frontend
```bash
# In a new terminal
npm run dev
```

### 3. Test Authentication
1. Go to `http://localhost:8080`
2. Click "Sign In" or "Register"
3. Create an account or log in
4. Check browser DevTools Network tab - you should see successful API calls to `localhost:8000`

## Troubleshooting

### Frontend Can't Connect to Backend

**Problem**: Network errors, CORS errors, or "Failed to fetch"

**Solutions**:
1. Verify backend is running on port 8000
2. Check `.env` has `VITE_API_URL=http://localhost:8000`
3. Restart frontend dev server after changing `.env`
4. Verify CORS middleware is configured in backend

### Authentication Not Working

**Problem**: 401 errors or "Invalid token"

**Solutions**:
1. Clear browser localStorage
2. Re-register or login
3. Check backend JWT configuration
4. Verify token is being sent in request headers

### API Endpoints Not Found

**Problem**: 404 errors

**Solutions**:
1. Check backend logs for registered routes
2. Verify endpoint paths match between frontend and backend
3. Ensure backend database is set up correctly

## API Request Flow

```
User Action (Frontend)
    ↓
React Component
    ↓
API Service (src/services/api.ts)
    ↓
HTTP Request with Auth Token
    ↓
FastAPI Backend (localhost:8000)
    ↓
Database Query
    ↓
JSON Response
    ↓
Frontend State Update
    ↓
UI Renders New Data
```

## Security Notes

- Never commit the `.env` file with real credentials
- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- Always validate input on both frontend and backend
- Use HTTPS in production
- Implement rate limiting on backend endpoints
