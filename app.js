import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import HelloController
    from "./controllers/hello-controller.js";
import UserController
    from "./controllers/users/users-controller.js";
import TuitsController
    from "./controllers/tuits/tuits-controller.js";

import mongoose from "mongoose";

// ES modules 中获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// CORS 配置
const CORS_ORIGINS = [
    'https://aquamarine-croquembouche-7d27fa.netlify.app',  // Netlify 前端
    'http://localhost:3000',                                // 本地开发前端
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || CORS_ORIGINS.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 配置静态文件服务
app.use('/images', express.static(path.join(__dirname, 'public/images')));

console.log('Images directory:', path.join(__dirname, 'public/images'));

// 添加测试路由
app.get('/test-images', (req, res) => {
    const imagesPath = path.join(__dirname, 'public/images');
    const fs = require('fs');
    fs.readdir(imagesPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ 
            imagesPath,
            files 
        });
    });
});

// MongoDB 连接
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://CS6510:CS6510@cluster0.zpnb3.mongodb.net/tuiter?retryWrites=true&w=majority&appName=Cluster0';

mongoose.set('debug', true); // 启用调试模式
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB Connected Successfully');
    console.log('Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
})
.catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
});

// API 状态检查路由
app.get('/', (req, res) => {
    res.json({
        status: 'Tuiter API is running',
        version: '1.0.0',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// 路由控制器
TuitsController(app);
HelloController(app);
UserController(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});