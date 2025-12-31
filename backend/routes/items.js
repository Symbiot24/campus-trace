import express from 'express';
import Item from '../models/Item.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all items (public)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single item by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'name email');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new item (protected)
router.post('/', authenticate, async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    location: req.body.location,
    imageUrl: req.body.imageUrl,
    status: req.body.status,
    user: req.userId,
    contactName: req.user.name,
    contactEmail: req.user.email,
    contactPhone: req.body.contactPhone || req.user.phone
  });

  try {
    const newItem = await item.save();
    const populatedItem = await Item.findById(newItem._id).populate('user', 'name email');
    res.status(201).json(populatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update item (protected - only owner)
router.patch('/:id', authenticate, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user is the owner
    if (item.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    if (req.body.title != null) item.title = req.body.title;
    if (req.body.description != null) item.description = req.body.description;
    if (req.body.category != null) item.category = req.body.category;
    if (req.body.location != null) item.location = req.body.location;
    if (req.body.imageUrl != null) item.imageUrl = req.body.imageUrl;
    if (req.body.status != null) item.status = req.body.status;

    const updatedItem = await item.save();
    const populatedItem = await Item.findById(updatedItem._id).populate('user', 'name email');
    res.json(populatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete item (protected - only owner)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user is the owner
    if (item.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search items (public)
router.get('/search/query', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchTerms = query.toLowerCase().split(' ');
    const items = await Item.find().populate('user', 'name email');
    
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
