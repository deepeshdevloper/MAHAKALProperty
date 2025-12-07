import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Property from './models/Property.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shanvi-properties';

const INITIAL_PROPERTIES = [
  {
    title: "Luxury Villa with Garden",
    location: "Arera Colony, Bhopal",
    price: "₹1.5 Cr",
    type: "Residential",
    beds: 4,
    baths: 3,
    area: "2400 sqft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000&auto=format&fit=crop",
    status: "Available",
    city: "bhopal"
  },
  {
    title: "Premium Commercial Space",
    location: "MP Nagar, Bhopal",
    price: "₹85 Lakh",
    type: "Commercial",
    beds: 0,
    baths: 1,
    area: "1200 sqft",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    status: "Available",
    city: "bhopal"
  },
  {
    title: "Modern Apartment",
    location: "Civil Lines, Vidisha",
    price: "₹35 Lakh",
    type: "Residential",
    beds: 2,
    baths: 2,
    area: "1100 sqft",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop",
    status: "Sold",
    city: "vidisha"
  },
  {
    title: "Agricultural Land",
    location: "Sanchi Road, Raisen",
    price: "₹45 Lakh",
    type: "Land",
    beds: 0,
    baths: 0,
    area: "2 Acres",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
    status: "Available",
    city: "raisen"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Property.deleteMany({});
    console.log('🗑️  Cleared existing properties');

    const properties = await Property.insertMany(INITIAL_PROPERTIES);
    console.log(`✅ Seeded ${properties.length} properties`);

    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const admin = new User({
        username: 'admin',
        password: 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Created admin user (username: admin, password: admin123)');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
