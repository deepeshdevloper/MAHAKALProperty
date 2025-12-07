import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db, { PropertyRow } from '../db/database.js';
import { requireAuth } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

router.get('/', (req, res) => {
  try {
    const properties = db.prepare('SELECT * FROM properties ORDER BY created_at DESC').all() as PropertyRow[];
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(req.params.id) as PropertyRow | undefined;
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

router.post('/', requireAuth, upload.single('image'), (req, res) => {
  try {
    const { title, location, price, type, beds, baths, area, status, city, imageUrl } = req.body;
    
    let image = imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop';
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const result = db.prepare(`
      INSERT INTO properties (title, location, price, type, beds, baths, area, image, status, city)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, location, price, type, parseInt(beds) || 0, parseInt(baths) || 0, area, image, status || 'Available', city || null);

    const newProperty = db.prepare('SELECT * FROM properties WHERE id = ?').get(result.lastInsertRowid) as PropertyRow;
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

router.put('/:id', requireAuth, upload.single('image'), (req, res) => {
  try {
    const { title, location, price, type, beds, baths, area, status, city, imageUrl } = req.body;
    const propertyId = req.params.id;

    const existing = db.prepare('SELECT * FROM properties WHERE id = ?').get(propertyId) as PropertyRow | undefined;
    if (!existing) {
      return res.status(404).json({ error: 'Property not found' });
    }

    let image = existing.image;
    if (req.file) {
      if (existing.image && existing.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '../..', existing.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      image = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      image = imageUrl;
    }

    db.prepare(`
      UPDATE properties 
      SET title = ?, location = ?, price = ?, type = ?, beds = ?, baths = ?, area = ?, image = ?, status = ?, city = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(title, location, price, type, parseInt(beds) || 0, parseInt(baths) || 0, area, image, status, city || null, propertyId);

    const updated = db.prepare('SELECT * FROM properties WHERE id = ?').get(propertyId) as PropertyRow;
    res.json(updated);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
});

router.delete('/:id', requireAuth, (req, res) => {
  try {
    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(req.params.id) as PropertyRow | undefined;
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (property.image && property.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '../..', property.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    db.prepare('DELETE FROM properties WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Property deleted' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

export default router;
