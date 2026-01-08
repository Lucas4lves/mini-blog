import { PostService } from "../services/PostService";
import { Request, Response } from "express";

export class PostController {
    private service : PostService

    constructor(svc : PostService){
        this.service = svc;
    }

    getAll = async(req : Request, res : Response) => {
        const data = await this.service.getAll();
        if(data.length > 0){
            return res.status(200).json(
                {
                    data : data
                }
            );
        }

        return res.status(400).json({
            message: "No results were found"
        });
    }

    getOne = async (req : Request, res : Response ) => {
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                statusCode: 400,
                message: "An Id must be provided"
            })
        }

        const data = await this.service.getById(parseInt(id));

        if(!data) {
            return res.status(200).json({
                message : "No record found for id " + id
            })
        }

        return res.status(200).json({
            data : data
        })
    }
}