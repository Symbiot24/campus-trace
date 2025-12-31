# Campus-Trace Backend

Minimalistic Node.js + Express + MongoDB backend for Campus-Trace lost and found platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/campus-trace
```

3. Make sure MongoDB is running locally:
```bash
# Check if MongoDB is running
pgrep -l mongod

# Start MongoDB (if not running)
brew services start mongodb-community
# or
mongod --config /opt/homebrew/etc/mongod.conf
```

4. Seed the database with sample data:
```bash
npm run seed
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Items
- `GET /api/items` - Get all items (sorted by newest first)
- `GET /api/items/:id` - Get single item by ID
- `POST /api/items` - Create new item
- `PATCH /api/items/:id` - Update item (partial update)
- `DELETE /api/items/:id` - Delete item
- `GET /api/items/search/query?q=searchterm` - Search items by title, description, or category

## Item Schema

```json
{
  "title": "String (required)",
  "description": "String (required)",
  "category": "String (required, enum)",
  "location": "String (required, enum)",
  "imageUrl": "String (optional, has default)",
  "status": "String (required: lost/found/claimed, default: found)",
  "date": "String (auto-generated in format: 'Dec 31, 2024')"
}
```

### Valid Categories
`Electronics`, `Books`, `Personal Items`, `Clothing`, `ID Cards`, `Keys`, `Bags`, `Accessories`, `Other`

### Valid Locations
`Library`, `Cafeteria`, `Main Building`, `Science Block`, `Sports Complex`, `Parking Lot`, `Hostel Area`, `Computer Lab`, `Other`

### Valid Statuses
`lost`, `found`, `claimed`

## Example Requests

### Create Item
```bash
curl -X POST http://localhost:5001/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Red Backpack",
    "description": "Nike red backpack with laptop compartment",
    "category": "Bags",
    "location": "Library",
    "status": "found"
  }'
```

### Get All Items
```bash
curl http://localhost:5001/api/items
```

### Search Items
```bash
curl "http://localhost:5001/api/items/search/query?q=laptop"
```

### Update Item Status
```bash
curl -X PATCH http://localhost:5001/api/items/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "claimed"}'
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload (Node.js --watch)
- `npm run seed` - Clear database and seed with sample data

## Tech Stack

- **Express** - Fast, minimalist web framework
- **Mongoose** - MongoDB ODM
- **CORS** - Enable cross-origin requests
- **dotenv** - Environment variable management

## Project Structure

```
backend/
├── models/
│   └── Item.js          # Item schema and model
├── routes/
│   └── items.js         # All item-related routes
├── server.js            # Main entry point
├── seed.js              # Database seeding script
├── package.json
├── .env                 # Environment variables (not in git)
├── .gitignore
└── README.md
```

## Notes

- Uses ES Modules (import/export syntax)
- Simple structure with single model and route file
- Minimalistic design for easy understanding and maintenance
- CORS enabled for all origins (configure for production)
- Auto-generates formatted date on item creation
