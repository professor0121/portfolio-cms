import express from 'express';
import connectDB from './config/db.config.js';
import redisClient from './config/redis.config.js'
import authRouter from './routes/auth.routes.js';
import { uploadRouter } from './routes/upload.routes.js';
import postRouter from './routes/post.routes.js';
import categoryRouter from './routes/category.routes.js';
import aboutRouter from './routes/about.routes.js';
import adsRouter from './routes/ads.routes.js';
import projectRouter from './routes/project.routes.js';
import notesRouter from './routes/notes.routes.js';
import courseRouter from './routes/course.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();
await redisClient.connect();
app.use('/auth', authRouter);
app.use('/upload', uploadRouter);
app.use('/posts', postRouter);
app.use('/categories', categoryRouter);
app.use('/about',aboutRouter);
app.use('/ads',adsRouter);
app.use('/projects',projectRouter);
app.use('/notes',notesRouter);
app.use('/course',courseRouter);


export default app;