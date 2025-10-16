const path = require('path');
const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const DB_NAME = process.env.DB_NAME || 'portfolioDB';
const MONGO_URI = process.env.MONGO_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN, credentials: false }));
app.use(express.json());

let client; let db;

async function connectMongo() {
  if (db) return db;
  client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 8000 });
  await client.connect();
  db = client.db(DB_NAME);
  return db;
}

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Unified Mongo collection endpoint (GET list, POST insert)
app.all('/api/v1/mongo/collection', async (req, res) => {
  try {
    const { collection: collectionName } = req.query;
    if (!collectionName) return res.status(400).json({ error: 'collection required' });
    const database = await connectMongo();
    const col = database.collection(collectionName);

    if (req.method === 'GET') {
      const filter = req.query.query ? JSON.parse(req.query.query) : {};
      const sort = req.query.sort ? JSON.parse(req.query.sort) : { createdAt: -1 };
      const limit = req.query.limit ? parseInt(req.query.limit, 10) : 0;
      const cursor = col.find(filter).sort(sort);
      if (limit) cursor.limit(limit);
      const documents = await cursor.toArray();
      return res.json({ documents });
    }

    if (req.method === 'POST') {
      const doc = req.body?.document || req.body;
      if (!doc) return res.status(400).json({ error: 'document required' });
      const result = await col.insertOne(doc);
      return res.json({ insertedId: result.insertedId });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'id required' });
      const { ObjectId } = require('mongodb');
      const result = await col.deleteOne({ _id: new ObjectId(id) });
      return res.json({ deletedCount: result.deletedCount });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Serve static frontend
const publicDir = path.join(__dirname, '..'); // PORTFOLIO/public/js -> PORTFOLIO/public
app.use(express.static(publicDir));

// SPA fallback using middleware (Express 5 호환)
app.use((_req, res) => {
  res.sendFile(path.join(publicDir, 'html', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


