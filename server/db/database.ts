import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../data/shanvi.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    price TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('Residential', 'Commercial', 'Land', 'Industrial')),
    beds INTEGER DEFAULT 0,
    baths INTEGER DEFAULT 0,
    area TEXT NOT NULL,
    image TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Available', 'Sold', 'Pending')) DEFAULT 'Available',
    city TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const count = db.prepare('SELECT COUNT(*) as count FROM properties').get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO properties (title, location, price, type, beds, baths, area, image, status, city)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialProperties = [
    {
      title: "Luxury Villa with Garden",
      location: "Arera Colony, Bhopal",
      price: "1.5 Cr",
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
      price: "85 Lakh",
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
      price: "35 Lakh",
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
      price: "45 Lakh",
      type: "Land",
      beds: 0,
      baths: 0,
      area: "2 Acres",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
      status: "Available",
      city: "raisen"
    }
  ];

  for (const prop of initialProperties) {
    insert.run(prop.title, prop.location, prop.price, prop.type, prop.beds, prop.baths, prop.area, prop.image, prop.status, prop.city);
  }
}

const adminCount = db.prepare('SELECT COUNT(*) as count FROM users WHERE username = ?').get('admin') as { count: number };
if (adminCount.count === 0) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
}

export default db;

export interface PropertyRow {
  id: number;
  title: string;
  location: string;
  price: string;
  type: 'Residential' | 'Commercial' | 'Land' | 'Industrial';
  beds: number;
  baths: number;
  area: string;
  image: string;
  status: 'Available' | 'Sold' | 'Pending';
  city: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRow {
  id: number;
  username: string;
  password: string;
  created_at: string;
}
