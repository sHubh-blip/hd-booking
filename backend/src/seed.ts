import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from './models/Experience';
import PromoCode from './models/PromoCode';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hd-booking';

const experiences = [
  {
    title: 'Kayaking',
    location: 'Udupi',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    slots: [
      { date: '2025-10-22', time: '07:00 am', available: 4, soldOut: false },
      { date: '2025-10-22', time: '9:00 am', available: 2, soldOut: false },
      { date: '2025-10-22', time: '11:00 am', available: 5, soldOut: false },
      { date: '2025-10-22', time: '1:00 pm', available: 0, soldOut: true },
      { date: '2025-10-23', time: '07:00 am', available: 6, soldOut: false },
      { date: '2025-10-23', time: '9:00 am', available: 3, soldOut: false },
      { date: '2025-10-24', time: '07:00 am', available: 5, soldOut: false },
      { date: '2025-10-24', time: '9:00 am', available: 4, soldOut: false },
      { date: '2025-10-25', time: '07:00 am', available: 7, soldOut: false },
      { date: '2025-10-26', time: '07:00 am', available: 5, soldOut: false },
    ],
  },
  {
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    slots: [
      { date: '2025-10-22', time: '05:00 am', available: 8, soldOut: false },
      { date: '2025-10-23', time: '05:00 am', available: 6, soldOut: false },
      { date: '2025-10-24', time: '05:00 am', available: 5, soldOut: false },
      { date: '2025-10-25', time: '05:00 am', available: 7, soldOut: false },
      { date: '2025-10-26', time: '05:00 am', available: 4, soldOut: false },
    ],
  },
  {
    title: 'Coffee Trail',
    location: 'Coorg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop',
    slots: [
      { date: '2025-10-22', time: '08:00 am', available: 5, soldOut: false },
      { date: '2025-10-23', time: '08:00 am', available: 4, soldOut: false },
      { date: '2025-10-24', time: '08:00 am', available: 6, soldOut: false },
      { date: '2025-10-25', time: '08:00 am', available: 3, soldOut: false },
      { date: '2025-10-26', time: '08:00 am', available: 5, soldOut: false },
    ],
  },
  {
    title: 'Boat Cruise',
    location: 'Sunderban',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    slots: [
      { date: '2025-10-22', time: '10:00 am', available: 10, soldOut: false },
      { date: '2025-10-23', time: '10:00 am', available: 8, soldOut: false },
      { date: '2025-10-24', time: '10:00 am', available: 9, soldOut: false },
      { date: '2025-10-25', time: '10:00 am', available: 7, soldOut: false },
      { date: '2025-10-26', time: '10:00 am', available: 6, soldOut: false },
    ],
  },
  {
    title: 'Bunjee Jumping',
    location: 'Manali',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1551524164-6cf77f8e1f48?w=800&h=600&fit=crop',
    slots: [
      { date: '2025-10-22', time: '09:00 am', available: 3, soldOut: false },
      { date: '2025-10-23', time: '09:00 am', available: 2, soldOut: false },
      { date: '2025-10-24', time: '09:00 am', available: 4, soldOut: false },
      { date: '2025-10-25', time: '09:00 am', available: 5, soldOut: false },
      { date: '2025-10-26', time: '09:00 am', available: 3, soldOut: false },
    ],
  },
];

const promoCodes = [
  {
    code: 'SAVE10',
    discount: 10,
    discountType: 'percentage' as const,
    valid: true,
  },
  {
    code: 'FLAT100',
    discount: 100,
    discountType: 'fixed' as const,
    valid: true,
  },
  {
    code: 'WELCOME20',
    discount: 20,
    discountType: 'percentage' as const,
    valid: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Experience.deleteMany({});
    await PromoCode.deleteMany({});

    // Insert experiences
    const insertedExperiences = await Experience.insertMany(experiences);
    console.log(`Inserted ${insertedExperiences.length} experiences`);

    // Insert promo codes
    const insertedPromos = await PromoCode.insertMany(promoCodes);
    console.log(`Inserted ${insertedPromos.length} promo codes`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();

