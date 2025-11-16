#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}  Starting Memorae Frontend Server ${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}Warning: .env.local file not found!${NC}"
    echo "Creating default .env.local..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:5001/api" > .env.local
    echo "NEXT_PUBLIC_APP_URL=http://localhost:3001" >> .env.local
    echo "NEXT_PUBLIC_ENV=development" >> .env.local
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the server
echo -e "${GREEN}Starting frontend server on port 3001...${NC}"
echo -e "${GREEN}Open http://localhost:3001 in your browser${NC}"
npm run dev
