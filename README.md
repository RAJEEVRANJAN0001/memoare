# Memorae - AI-Powered Memory Management System

Memorae is an intelligent memory management application that helps you capture, organize, and retrieve your thoughts, ideas, and important information using AI-powered categorization and natural language processing.

## Features

- **AI-Powered Categorization**: Automatically categorizes memories using Google Gemini AI
- **Smart Tagging**: Generates relevant tags for easy searching and organization
- **Natural Language Processing**: Extract intents and entities from conversational inputs
- **Intelligent Search**: Find memories using semantic search and filters
- **Reminders**: Set and manage reminders for your important memories
- **Voice Input**: Create memories using voice commands
- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Authentication**: Secure user authentication with JWT
- **Cloud Storage**: MongoDB Atlas for reliable data storage

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **MongoDB Atlas** for database
- **Redis** for caching and session management
- **Google Gemini AI** (2.0-flash-exp) for NLP capabilities
- **JWT** for authentication
- **Jest** for testing

### Frontend
- **React** with **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Axios** for API calls

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Redis server
- Google Gemini API key

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd MEMOARE
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env` with your credentials:
```env
PORT=5001
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/memorae

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

### 4. Start Redis
```bash
# macOS
brew services start redis

# Linux
sudo systemctl start redis

# Windows
# Download and run Redis from https://redis.io/download
```

## Running the Application

### Start Backend
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5001

### Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Memories
- `GET /api/memories` - Get all memories
- `GET /api/memories/:id` - Get specific memory
- `POST /api/memories` - Create new memory
- `PUT /api/memories/:id` - Update memory
- `DELETE /api/memories/:id` - Delete memory
- `GET /api/memories/search` - Search memories

### Reminders
- `GET /api/reminders` - Get all reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

### Chat (AI Assistant)
- `POST /api/chat` - Send message to AI assistant

## Testing

### Backend Tests
```bash
cd backend
npm test

# Run specific test suite
npm test tests/services/nlpService.test.ts

# Run with coverage
npm test -- --coverage
```

## AI Features

### Memory Categorization
Memories are automatically categorized into:
- Work
- Personal
- Learning
- Ideas
- Tasks
- Shopping
- Health
- Finance
- Travel
- Other

### Tag Generation
The AI automatically generates relevant tags (up to 5) based on memory content.

### Intent Extraction
Understands user intent from natural language:
- `create_memory` - Create a new memory
- `create_reminder` - Set a reminder
- `search` - Search for memories
- `question` - Answer questions about memories
- `other` - General conversation

### Retry Logic
Built-in retry mechanism with exponential backoff:
- 3 retry attempts
- Handles rate limits (429)
- Handles service unavailability (503)
- Handles network errors (ECONNRESET)

## Project Structure

```
MEMOARE/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   │   └── ai/           # AI services (Gemini)
│   │   ├── middleware/       # Express middleware
│   │   ├── utils/            # Utility functions
│   │   ├── database/         # DB connections
│   │   ├── jobs/             # Background jobs
│   │   └── server.ts         # Entry point
│   ├── tests/                # Test files
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript types
│   │   └── App.tsx           # Main app component
│   └── package.json
│
└── README.md
```

## Environment Variables

### Backend
| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5001) |
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `REDIS_HOST` | Redis host | No (default: localhost) |
| `REDIS_PORT` | Redis port | No (default: 6379) |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRES_IN` | JWT expiration time | No (default: 7d) |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

### Frontend
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas cluster
2. Configure environment variables on hosting platform
3. Deploy to Heroku, Railway, or any Node.js hosting service

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Vercel, Netlify, or any static hosting service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions, please create an issue in the repository.

## Acknowledgments

- Google Gemini AI for natural language processing
- MongoDB Atlas for database services
- The open-source community for amazing tools and libraries
