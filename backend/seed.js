import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from './models/Item.js';

dotenv.config();

const seedData = [
  {
    title: "Blue Hydroflask Water Bottle",
    description: "32oz cyan Hydroflask with scratches on the bottom. Has a mountain sticker on the side.",
    category: "Personal Items",
    location: "Library",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
    status: "found",
    date: "Dec 23, 2024",
  },
  {
    title: "Scientific Calculator TI-84",
    description: "Texas Instruments TI-84 Plus graphing calculator. Name 'Sarah' written on the back in silver marker.",
    category: "Electronics",
    location: "Science Block",
    imageUrl: "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?w=400&h=300&fit=crop",
    status: "found",
    date: "Dec 22, 2024",
  },
  {
    title: "Black AirPods Pro Case",
    description: "Apple AirPods Pro in black silicone case. Initials 'JK' engraved on the charging case.",
    category: "Electronics",
    location: "Cafeteria",
    imageUrl: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=300&fit=crop",
    status: "found",
    date: "Dec 22, 2024",
  },
  {
    title: "Organic Chemistry Textbook",
    description: "McMurry Organic Chemistry 9th Edition. Multiple pages have yellow highlighting. Back cover slightly torn.",
    category: "Books",
    location: "Main Building",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    status: "lost",
    date: "Dec 21, 2024",
  },
  {
    title: "Student ID Card",
    description: "University student ID card. Name partially visible - starts with 'Michael'. Engineering department.",
    category: "ID Cards",
    location: "Computer Lab",
    imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
    status: "found",
    date: "Dec 21, 2024",
  },
  {
    title: "Navy Blue Hoodie",
    description: "Nike navy blue hoodie, size M. Has a small bleach stain on the left sleeve near the cuff.",
    category: "Clothing",
    location: "Sports Complex",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
    status: "found",
    date: "Dec 20, 2024",
  },
  {
    title: "Car Keys with Leather Keychain",
    description: "Honda car keys with brown leather keychain. Has a small bottle opener attached.",
    category: "Keys",
    location: "Parking Lot",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    status: "found",
    date: "Dec 20, 2024",
  },
  {
    title: "MacBook Charger 96W",
    description: "Apple 96W USB-C power adapter with charging cable. Cable has minor fraying near the connector.",
    category: "Electronics",
    location: "Library",
    imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop",
    status: "claimed",
    date: "Dec 19, 2024",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    await Item.deleteMany({});
    console.log('✓ Cleared existing items');

    await Item.insertMany(seedData);
    console.log(`✓ Seeded ${seedData.length} items`);

    await mongoose.connection.close();
    console.log('✓ Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
