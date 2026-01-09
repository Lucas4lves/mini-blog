import { PostService } from "../services/PostService";
import { Request, Response } from "express";

export class PostController {
    private service : PostService

    constructor(svc : PostService){
        this.service = svc;
    }

    createPost = async(req: Request, res : Response) => {
        const post = req.body;

        const result = await this.service.create(post);
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
    }

    getAll = async(req : Request, res : Response) => {
        const result = await this.service.getAll();
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

        const result = await this.service.getById(parseInt(id));

        if(!result.success) {
            return res.status(500).json({
                success: false,
                message: "Could not retrieve the record with id " + id,
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

        if(!id){
            return res.status(400).json({
                success: false,
                error: `Invalid Id`,
                data: null,
                message: `Invalid Id`,
                timestamp: new Date().toISOString()
            })
        }

        const update = await this.service.updateOne(parseInt(id), updates);

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
    }
}