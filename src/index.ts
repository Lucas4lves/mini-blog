import express, { Request, Response } from 'express'

import { postDbPool } from './database/postDbConfig.js'
import { PostRepository } from './repositories/PostRepository.js'
import { PostService } from './services/PostService.js'
import { PostController } from './controllers/PostController.js'

const app = express()
app.use(express.json())

const postsRepo = new PostRepository(postDbPool);
const postsService = new PostService(postsRepo);
const postsController = new PostController(postsService);

app.get("/posts", postsController.getAll)
app.get("/tic", (req : Request, res : Response)=>{
    res.status(200).json({
        message : "tac!"
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Backend running at port ${process.env.APP_PORT}`);
})