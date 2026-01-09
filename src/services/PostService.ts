import { PostRepository } from "../repositories/PostRepository";
import { Post } from "../models/Post";
import { Result } from "../models/Result";

export class PostService{
    private repo : PostRepository

    constructor(repo : PostRepository){
        this.repo = repo
    }

    create = async(post : Post) : Promise<Result<Post>> => {
        const createdPost = await this.repo.insert(post);
        if(!createdPost.success){
            return createdPost;
        }

        return {
            success: true,
            data : createdPost.data
        }
    }

    getAll = async () : Promise<Result<Post[]>> => {
        const results = await this.repo.selectAll();

        if(!results.success){
            return results;
        }
        
        return { success: true, data: results.data }
    }

    getById = async (id : number) : Promise<Result<Post>> => {
        const result = await this.repo.selectById(id);

        if(!result.success){
            return result;
        }

        return { success: true, data: result.data }
    }

    updateOne = async (id : number, updates : Omit<Post, 'id' | 'created_at' | 'updated_at'>) : Promise<Result<Post>> => {
        const updated = await this.repo.update(id, updates);

        if(!updated.success){
            return updated;
        }

        return { success: true, data: updated.data };
    }
}