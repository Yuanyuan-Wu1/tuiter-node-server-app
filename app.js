import express from 'express';
import cors from 'cors';
import connectDB from './config/db.config.js';
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";

// 创建 Express 应用
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://CS6510:CS6510@cluster0.zpnb3.mongodb.net/tuiter?retryWrites=true&w=majority&appName=Cluster0';

// 配置中间件 - 只配置一次
app.use(cors({
    origin: ['https://aquamarine-croquembouche-7d27fa.netlify.app', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// 连接数据库
connectDB(MONGODB_URI);

// 配置路由控制器 - 每个控制器只注册一次
TuitsController(app);
HelloController(app);
UserController(app);

// 测试路由
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});