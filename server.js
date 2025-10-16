const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// CORS 설정
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// MongoDB 연결
let db;
const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        db = client.db(process.env.DB_NAME || 'portfolioDB');
        console.log('MongoDB 연결 성공');
    } catch (error) {
        console.error('MongoDB 연결 실패:', error);
    }
};

// MongoDB API 엔드포인트
app.get('/api/v1/mongo/collection', async (req, res) => {
    try {
        const { db: dbName, collection, query, sort, limit, skip } = req.query;
        
        if (!collection) {
            return res.status(400).json({ error: 'Collection name is required' });
        }

        const collectionObj = db.collection(collection);
        let findQuery = {};
        
        if (query) {
            try {
                findQuery = JSON.parse(query);
            } catch (e) {
                return res.status(400).json({ error: 'Invalid query format' });
            }
        }

        let cursor = collectionObj.find(findQuery);
        
        if (sort) {
            try {
                cursor = cursor.sort(JSON.parse(sort));
            } catch (e) {
                return res.status(400).json({ error: 'Invalid sort format' });
            }
        }
        
        if (skip) cursor = cursor.skip(parseInt(skip));
        if (limit) cursor = cursor.limit(parseInt(limit));
        
        const results = await cursor.toArray();
        res.json(results);
    } catch (error) {
        console.error('GET error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/v1/mongo/collection', async (req, res) => {
    try {
        const { db: dbName, collection, document } = req.body;
        
        if (!collection || !document) {
            return res.status(400).json({ error: 'Collection name and document are required' });
        }

        const collectionObj = db.collection(collection);
        const result = await collectionObj.insertOne({
            ...document,
            createdAt: new Date()
        });
        
        res.json({ 
            success: true, 
            insertedId: result.insertedId,
            message: 'Document inserted successfully'
        });
    } catch (error) {
        console.error('POST error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/v1/mongo/collection', async (req, res) => {
    try {
        const { db: dbName, collection, id } = req.query;
        
        if (!collection || !id) {
            return res.status(400).json({ error: 'Collection name and id are required' });
        }

        const collectionObj = db.collection(collection);
        const result = await collectionObj.deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        res.json({ 
            success: true, 
            message: 'Document deleted successfully'
        });
    } catch (error) {
        console.error('DELETE error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// SPA fallback - 모든 라우트를 index.html로 리다이렉트
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// 서버 시작
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer().catch(console.error);
