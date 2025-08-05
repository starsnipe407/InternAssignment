#!/bin/bash

echo "🚀 Starting Startup Idea Evaluator Development Environment"
echo "========================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."

# Install main app dependencies
echo "Installing main app dependencies..."
npm install

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install
cd ..

echo "✅ Dependencies installed successfully!"

echo ""
echo "🖥️  Starting backend server..."
cd server
nohup node index.js > server.log 2>&1 &
SERVER_PID=$!
cd ..

# Wait for server to start
sleep 3

# Check if server is running
if curl -s http://localhost:3000/ideas > /dev/null; then
    echo "✅ Backend server is running on http://localhost:3000"
else
    echo "❌ Failed to start backend server"
    exit 1
fi

echo ""
echo "📱 Starting React Native app..."
echo "Choose your platform:"
echo "  - Press 'i' for iOS Simulator"
echo "  - Press 'a' for Android Emulator"
echo "  - Press 'w' for Web Browser"
echo "  - Scan QR code with Expo Go app for physical device"
echo ""

# Start Expo
npm start

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Shutting down development environment..."
    kill $SERVER_PID 2>/dev/null
    echo "✅ Development environment stopped"
}

# Set trap to cleanup on exit
trap cleanup EXIT