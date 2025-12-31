#!/bin/bash

# Campus-Trace Startup Script
# This script starts both the backend and frontend servers

echo "🚀 Starting Campus-Trace..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running!"
    echo "Please start MongoDB first:"
    echo "  brew services start mongodb-community"
    echo "  or"
    echo "  mongod --config /opt/homebrew/etc/mongod.conf"
    exit 1
fi

echo "✓ MongoDB is running"
echo ""

# Start backend
echo "Starting backend on port 5001..."
cd backend
npm start &
BACKEND_PID=$!
echo "✓ Backend started (PID: $BACKEND_PID)"
cd ..

# Wait for backend to be ready
echo "Waiting for backend to be ready..."
sleep 3

# Start frontend
echo ""
echo "Starting frontend on port 8080..."
cd frontend
npm run dev &
FRONTEND_PID=$!
echo "✓ Frontend started (PID: $FRONTEND_PID)"
cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Campus-Trace is running!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Frontend: http://localhost:8080"
echo "Backend:  http://localhost:5001"
echo "API:      http://localhost:5001/api/items"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
