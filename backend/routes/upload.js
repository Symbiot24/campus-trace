import express from 'express';
import fs from 'fs';
import path from 'path';
import { upload } from '../config/upload.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Upload image endpoint
router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Read file and convert to base64
    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const base64Image = fileBuffer.toString('base64');
    const mimeType = req.file.mimetype;
    
    // Create data URL
    const imageUrl = `data:${mimeType};base64,${base64Image}`;

    // Delete the file from disk after converting to base64
    fs.unlinkSync(filePath);

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
});

export default router;
