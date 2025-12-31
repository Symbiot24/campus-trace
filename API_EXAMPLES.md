# Campus-Trace API Examples

Quick reference for testing and using the Campus-Trace API.

## Base URL
```
http://localhost:5001/api
```

## Health Check

### Check API Status
```bash
curl http://localhost:5001/api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Campus-Trace API is running"
}
```

## Items Endpoints

### 1. Get All Items
```bash
curl http://localhost:5001/api/items
```

**Response:** Array of all items sorted by newest first
```json
[
  {
    "_id": "695536eca938cc30dc46efd9",
    "title": "Blue Hydroflask Water Bottle",
    "description": "32oz cyan Hydroflask with scratches on the bottom...",
    "category": "Personal Items",
    "location": "Library",
    "imageUrl": "https://images.unsplash.com/...",
    "status": "found",
    "date": "Dec 23, 2024",
    "createdAt": "2025-12-31T14:45:00.796Z",
    "updatedAt": "2025-12-31T14:45:00.796Z"
  },
  ...
]
```

### 2. Get Single Item
```bash
curl http://localhost:5001/api/items/695536eca938cc30dc46efd9
```

**Response:** Single item object

### 3. Create New Item
```bash
curl -X POST http://localhost:5001/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Red Nike Backpack",
    "description": "Large red Nike backpack with laptop compartment. Has a small tear on the front pocket.",
    "category": "Bags",
    "location": "Library",
    "status": "found",
    "imageUrl": "https://example.com/image.jpg"
  }'
```

**Response:** Newly created item with generated `_id`, `date`, and timestamps

**Validation:**
- `title` - Required, string
- `description` - Required, string
- `category` - Required, must be one of: Electronics, Books, Personal Items, Clothing, ID Cards, Keys, Bags, Accessories, Other
- `location` - Required, must be one of: Library, Cafeteria, Main Building, Science Block, Sports Complex, Parking Lot, Hostel Area, Computer Lab, Other
- `status` - Required, must be: lost, found, or claimed
- `imageUrl` - Optional, defaults to placeholder
- `date` - Auto-generated in format "Dec 31, 2024"

### 4. Update Item
```bash
curl -X PATCH http://localhost:5001/api/items/695536eca938cc30dc46efd9 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "claimed"
  }'
```

**Response:** Updated item object

**Note:** Only include fields you want to update (partial update)

### 5. Delete Item
```bash
curl -X DELETE http://localhost:5001/api/items/695536eca938cc30dc46efd9
```

**Response:**
```json
{
  "message": "Item deleted"
}
```

### 6. Search Items
```bash
# Search for "blue water bottle"
curl "http://localhost:5001/api/items/search/query?q=blue%20water%20bottle"

# Or with spaces (in quotes)
curl "http://localhost:5001/api/items/search/query?q=laptop"
```

**Response:** Array of items matching the search query

**How it works:**
- Splits query into terms (e.g., "blue water" → ["blue", "water"])
- Searches in: title, description, and category
- Returns items that contain ANY of the search terms
- Case-insensitive matching

## Frontend API Client Usage

The frontend uses the `lib/api.ts` client for type-safe API calls:

```typescript
import { itemsApi } from '@/lib/api';

// Get all items
const items = await itemsApi.getAll();

// Get single item
const item = await itemsApi.getById('item-id');

// Create item
const newItem = await itemsApi.create({
  title: 'Lost Laptop',
  description: 'MacBook Pro 2023',
  category: 'Electronics',
  location: 'Library',
  imageUrl: 'https://...',
  status: 'lost'
});

// Update item
const updated = await itemsApi.update('item-id', {
  status: 'claimed'
});

// Delete item
await itemsApi.delete('item-id');

// Search items
const results = await itemsApi.search('blue water bottle');
```

## Error Handling

### 400 Bad Request
Invalid input or validation error
```json
{
  "message": "Validation error details"
}
```

### 404 Not Found
Item doesn't exist
```json
{
  "message": "Item not found"
}
```

### 500 Internal Server Error
Server error
```json
{
  "message": "Error message"
}
```

## Testing with Postman

**Import these as a Postman collection:**

1. **GET Health Check**
   - Method: GET
   - URL: `http://localhost:5001/api/health`

2. **GET All Items**
   - Method: GET
   - URL: `http://localhost:5001/api/items`

3. **POST Create Item**
   - Method: POST
   - URL: `http://localhost:5001/api/items`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "title": "Test Item",
       "description": "Test description",
       "category": "Electronics",
       "location": "Library",
       "status": "found"
     }
     ```

4. **GET Search Items**
   - Method: GET
   - URL: `http://localhost:5001/api/items/search/query?q=laptop`

5. **PATCH Update Item**
   - Method: PATCH
   - URL: `http://localhost:5001/api/items/{{item_id}}`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "status": "claimed"
     }
     ```

6. **DELETE Item**
   - Method: DELETE
   - URL: `http://localhost:5001/api/items/{{item_id}}`

## Valid Values Reference

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

### Statuses
- lost
- found
- claimed

## Notes

- All endpoints return JSON
- CORS is enabled for all origins
- Dates are auto-generated in readable format
- Search is case-insensitive
- Items are sorted by creation date (newest first)
- MongoDB `_id` field is mapped to `id` in frontend
