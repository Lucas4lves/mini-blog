import { PostRepository } from "../repositories/PostRepository";
import { Post } from "../models/Post";
import { Result } from "../models/Result";
import { PostDTO } from "../models/PostDTO";

export class PostService{
    private repo : PostRepository

    constructor(repo : PostRepository){
        this.repo = repo
    }

    createPost = async(post : PostDTO ) : Promise<Result<Post>> => {
        const createdPost = await this.repo.insert(post);
        if(!createdPost.success){
            return createdPost;
        }

        return {
            success: true,
            data : createdPost.data
        }
    }

    getAllPosts = async () : Promise<Result<Post[]>> => {
        const results = await this.repo.selectAll();

        if(!results.success){
            return results;
        }
        
        return { success: true, data: results.data }
    }

    getPostData = async (id : number) : Promise<Result<Post>> => {
        const result = await this.repo.selectById(id);

        if(!result.success){
            return result;
        }

        return { success: true, data: result.data }
    }

    editPost = async (id : number, updates : Omit<Post, 'id' | 'created_at' | 'updated_at'>) : Promise<Result<Post>> => {
        const updated = await this.repo.update(id, updates);

        if(!updated.success){
            return updated;
        }

        return { success: true, data: updated.data };
    }

    deletePost = async (id : number) : Promise<Result<any>> => {
        const result = await this.repo.deleteOne(id);

        if(!result.success){
            return result;
        }

        return {
            success: true,
            data: result.data
        }
    }
}