# Campus-Trace - Lost & Found Platform

A full-stack lost and found platform for campus items with React frontend and Node.js backend.

## 🎯 Project Overview

**Campus-Trace** helps students find their lost items on campus. Users can:
- Report found or lost items
- Search items with AI-powered semantic search
- View detailed item information
- Track item status (lost, found, claimed)

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Shadcn/ui with Radix UI
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Port**: 8080

### Backend
- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js
- **Database**: MongoDB
- **Port**: 5001
- **Entry Point**: `server.js`

## 📁 Project Structure

```
Campus Trace/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/      # Page components
│   │   ├── lib/        # Utilities and API client
│   │   └── App.tsx     # Root component
│   ├── package.json
│   └── vite.config.ts
│
└── backend/            # Node.js backend API
    ├── models/         # MongoDB schemas
    │   └── Item.js
    ├── routes/         # API routes
    │   └── items.js
    ├── server.js       # Entry point
    ├── seed.js         # Database seeding script
    ├── package.json
    └── .env            # Environment variables
```

## 🚀 Quick Start

The easiest way to start both servers:

```bash
# Make sure MongoDB is running
brew services start mongodb-community

# Use the startup script
./start.sh
```

Or start them separately:

**Terminal 1 - Backend:**
```bash
cd backend
npm run seed    # First time only
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then visit: **http://localhost:8080**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or connection URI
- npm or yarn package manager

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/campus-trace
```

4. Seed the database with sample data:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Items
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get single item by ID
- `POST /api/items` - Create new item
- `PATCH /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `GET /api/items/search/query?q=searchterm` - Search items

### Item Schema
```json
{
  "title": "String (required)",
  "description": "String (required)",
  "category": "String (required, enum)",
  "location": "String (required, enum)",
  "imageUrl": "String (optional)",
  "status": "String (required: lost/found/claimed)",
  "date": "String (auto-generated)"
}
```

### Categories
- Electronics
- Books
- Personal Items
- Clothing
- ID Cards
- Keys
- Bags
- Accessories
- Other

### Locations
- Library
- Cafeteria
- Main Building
- Science Block
- Sports Complex
- Parking Lot
- Hostel Area
- Computer Lab
- Other

## 🔧 Development

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start with auto-reload (Node.js --watch)
- `npm run seed` - Seed database with sample data

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🗄️ Database

The backend uses MongoDB with Mongoose ODM. The database schema includes:

**Item Model:**
- `title`: String, required
- `description`: String, required
- `category`: Enum (see categories above)
- `location`: Enum (see locations above)
- `imageUrl`: String with default placeholder
- `status`: Enum ['lost', 'found', 'claimed']
- `date`: Auto-generated formatted date
- `timestamps`: Automatic createdAt/updatedAt

## 🌐 Features

### Frontend Features
- ✅ Responsive UI with Shadcn/ui components
- ✅ Report lost/found items with modal form
- ✅ Search items with AI-powered semantic search
- ✅ View item details in modal
- ✅ Filter items by status
- ✅ Real-time updates with TanStack Query
- ✅ Toast notifications for user actions
- ✅ Hero section with call-to-action
- ✅ How it works section
- ✅ Testimonials section
- ✅ Responsive grid layout

### Backend Features
- ✅ RESTful API with Express
- ✅ MongoDB integration with Mongoose
- ✅ CORS enabled for frontend
- ✅ Input validation
- ✅ Error handling
- ✅ Search functionality
- ✅ Database seeding script

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/campus-trace
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001/api
```

## 📝 Notes

- Mock data has been removed from frontend
- Frontend now fetches all data from backend API
- API proxy configured in vite.config.ts for development
- Backend uses ES Modules (type: "module" in package.json)
- Simple, minimalistic backend structure for easy maintenance

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running: `mongod --version`
- Check if port 5001 is available: `lsof -i :5001`
- Verify MONGODB_URI in .env file

### Frontend can't connect to backend
- Ensure backend is running on port 5001
- Check VITE_API_URL in frontend .env
- Check browser console for CORS errors

### Database connection issues
- Verify MongoDB is running
- Check MongoDB URI format
- Ensure database permissions

## 📄 License

MIT
