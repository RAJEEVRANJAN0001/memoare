#!/bin/bash

# Colors for output
GREEN='\033[0.32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}  Starting Memorae Backend Server  ${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${YELLOW}Warning: MongoDB is not running!${NC}"
    echo "Please start MongoDB first with:"
    echo "  brew services start mongodb-community"
    exit 1
fi

# Check if Redis is running
if ! pgrep -x "redis-server" > /dev/null; then
    echo -e "${YELLOW}Warning: Redis is not running!${NC}"
    echo "Please start Redis first with:"
    echo "  brew services start redis"
    exit 1
fi

# Navigate to backend directory
cd "$(dirname "$0")"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Warning: .env file not found!${NC}"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "Please update .env with your actual configuration"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the server
echo -e "${GREEN}Starting backend server on port 5001...${NC}"
npm run dev
