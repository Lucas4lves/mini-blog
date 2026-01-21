import express from 'express';
import cors from 'cors';
import { postDbPool } from './database/postDbConfig.js'
import { PostRepository } from './repositories/PostRepository.js'
import { PostService } from './services/PostService.js'
import { PostController } from './controllers/PostController.js'
import { HealthCheckController } from './controllers/HealthCheckController.js'

const app = express()
app.use(express.json())
app.use(cors())

const postsRepo = new PostRepository(postDbPool);
const healthCheckController = new HealthCheckController(postDbPool);
const postsService = new PostService(postsRepo);
const postsController = new PostController(postsService);

app.get("/healthz", healthCheckController.run);
app.get("/posts", postsController.getAll);
app.get("/posts/:id", postsController.getOne);
app.post("/posts/:id", postsController.updateOne);
app.post("/posts", postsController.createPost);

app.listen(process.env.APP_PORT, () => {
    console.log(`Backend running at port ${process.env.APP_PORT}`);
})
