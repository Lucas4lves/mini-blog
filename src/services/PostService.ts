import { PostRepository } from "../repositories/PostRepository";
import { Post } from "../models/Post";

export class PostService{
    private repo : PostRepository

    constructor(repo : PostRepository){
        this.repo = repo
    }

    getAll = async () : Promise<Post[] | []> => {
        const results = await this.repo.selectAll();

        if(results.length > 0){
            return results;
        }

        return [];
    }

    getById = async (id : number) : Promise<Post | null> => {
        const result = await this.repo.selectById(id);

        if(!result){
            return null;
        }

        return result;
    }
}