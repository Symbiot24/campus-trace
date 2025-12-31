import express from 'express';
import fs from 'fs';
import path from 'path';
import { upload } from '../config/upload.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const base64Image = fileBuffer.toString('base64');
    const mimeType = req.file.mimetype;
    
    const imageUrl = `data:${mimeType};base64,${base64Image}`;

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
