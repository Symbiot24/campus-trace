import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new item
router.post('/', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    location: req.body.location,
    imageUrl: req.body.imageUrl,
    status: req.body.status
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update item
router.patch('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (req.body.title != null) item.title = req.body.title;
    if (req.body.description != null) item.description = req.body.description;
    if (req.body.category != null) item.category = req.body.category;
    if (req.body.location != null) item.location = req.body.location;
    if (req.body.imageUrl != null) item.imageUrl = req.body.imageUrl;
    if (req.body.status != null) item.status = req.body.status;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search items
router.get('/search/query', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchTerms = query.toLowerCase().split(' ');
    const items = await Item.find();
    
    const filtered = items.filter(item => {
      const text = `${item.title} ${item.description} ${item.category}`.toLowerCase();
      return searchTerms.some(term => text.includes(term));
    });

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
