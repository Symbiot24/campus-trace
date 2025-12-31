import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Books', 'Personal Items', 'Clothing', 'ID Cards', 'Keys', 'Bags', 'Accessories', 'Other']
  },
  location: {
    type: String,
    required: true,
    enum: ['Library', 'Cafeteria', 'Main Building', 'Science Block', 'Sports Complex', 'Parking Lot', 'Hostel Area', 'Computer Lab', 'Other']
  },
  imageUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    required: true,
    enum: ['lost', 'found', 'claimed'],
    default: 'found'
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Item', itemSchema);
