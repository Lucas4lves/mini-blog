import { PostService } from "../services/PostService";
import { Request, Response } from "express";
import { PostSchema, UpdatePostSchema } from "../validations/createPostValidation.js";
import { Post } from "../models/Post";
import { success } from "zod";

export class PostController {
    private service : PostService

    constructor(svc : PostService){
        this.service = svc;
    }

    createPost = async(req: Request, res : Response) => {
        const post : Post = req.body;

        try{
            const validPost = await PostSchema.parseAsync({
            title: post.title,
            content: post.content,
            author: post.author
        });
        const result = await this.service.createPost(validPost);
        if(!result.success){
            return res.status(500).json({
                ...result,
                message: "Unable to create a record",
                data : null,
                timestamp: new Date().toISOString()
            })
        }

        return res.status(201).json({
            ...result,
            error : null,
            message: "Record created successfully!",
            timestamp: new Date().toISOString()
        })
        }catch(err ){
                return res.status(400).json({
                    success: false,
                    error: err,
                    timestamp: new Date().toISOString()
                })
        }

    }

    getAll = async(req : Request, res : Response) => {
        const result = await this.service.getAllPosts();
        if(!result.success){
            return res.status(500).json({
                success: false,
                error: result.error,
                message: `Could not retrieve records from the database`,
                data: null,
                timestamp: new Date().toISOString()
            })
        }

        return res.status(200).json({
            success: result.success,
            message: "Records found!",
            data : result.data,
            error: null,
            timestamp: new Date().toISOString()
        });
    }

    getOne = async (req : Request, res : Response ) => {
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Invalid ID",
                data: null,
                error: `Invalid Id provided`,
                timestamp : new Date().toISOString()
            })
        }

        const result = await this.service.getPostData(parseInt(id));

        if(!result.success) {
            return res.status(500).json({
                success: false,
                data: null,
                error: result.error,
                timestamp : new Date().toISOString()
            })
        }

        return res.status(200).json({
                success: true,
                message: "Record retrieved successfully!",
                data: result.data,
                error: null,
                timestamp : new Date().toISOString()
        })
    }

    updateOne = async (req : Request, res : Response ) => {
        const id = req.params.id;
        const updates = req.body;

        try{
            const validUpdatePost = await UpdatePostSchema.parseAsync({
                ...updates
            });

            if(!id){
            return res.status(400).json({
                success: false,
                error: `Invalid Id`,
                data: null,
                message: `Invalid Id`,
                timestamp: new Date().toISOString()
            })
        }

        const update = await this.service.editPost(parseInt(id), updates);

        if(!update.success){
            return res.status(500).json({
                success : update.success,
                error: update.error,
                message: "Could not update the record! " + update.error,
                data : null,
                timestamp: new Date().toISOString()
            })
        }

        return res.status(200).json({
            success: update.success,
            message: "Record updated successfully",
            data : update.data,
            error: null,
            timestamp: new Date().toISOString()
        })

        }catch(err){
            return res.status(400).json({
                success: false,
                error: err
            })
        }
    }

    delete = async (req : Request, res : Response ) => {
        const paramId = req.params.id;

        if(!paramId){
            return res.status(500).json({
                success: false,
                error: `Post id not provided or invalid`
            })
        }

        const result = await this.service.deletePost(parseInt(paramId));

        if(!result.success){
            return res.status(500).json({
                success: false,
                error: result.error
            })
        }

        return res.status(201).json({
            success: true,
            message: result.data
        })
    }
}