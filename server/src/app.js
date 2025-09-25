import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.config.js';
import redisClient from './config/redis.config.js'
import authRouter from './routes/auth.routes.js';
import mediaRouter from './routes/upload.routes.js';
import postRouter from './routes/post.routes.js';
import categoryRouter from './routes/category.routes.js';
import aboutRouter from './routes/about.routes.js';
import adsRouter from './routes/ads.routes.js';
import projectRouter from './routes/project.routes.js';
import notesRouter from './routes/notes.routes.js';
import courseRouter from './routes/course.routes.js';
import cors from 'cors';
import tagRouter from './routes/tag.routes.js';
import commentRouter from './routes/comment.routes.js';
import reviewRouter from './routes/review.routes.js';
import likeRouter from './routes/like.routes.js';
import contactRouter from './routes/contact.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

connectDB();
await redisClient.connect();
app.use('/auth', authRouter);
app.use('/media', mediaRouter);
app.use('/posts', postRouter);
app.use('/categories', categoryRouter);
app.use('/tags',tagRouter)
app.use('/about',aboutRouter);
app.use('/ads',adsRouter);
app.use('/projects',projectRouter);
app.use('/notes',notesRouter);
app.use('/course',courseRouter);
app.use('/comments',commentRouter);
app.use('/reviews', reviewRouter);
app.use('/likes', likeRouter);
app.use('/contact',contactRouter);


// Health check route
app.get("/health", (req, res) => {
  const uptime = process.uptime(); // server uptime in seconds
  const timestamp = new Date();

  res.status(200).json({
    status: "ok",
    uptime,
    timestamp,
  });
});

export default app;