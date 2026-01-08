import { Post } from "../models/Post"
import { Pool } from "pg"

export class PostRepository {
    private dbDriver : Pool

    constructor(driver : Pool){
        this.dbDriver = driver
    }

    selectAll = async () : Promise<Post[] | []> => {
        const sql = `SELECT * FROM POSTS ORDER BY id DESC`;

        const results = await this.dbDriver.query(sql);

        if(results.rowCount && results.rowCount >= 1 ){
            return results.rows;
        }

        return [];
    }

    selectById = async (id : number) : Promise<Post | null> => {
        const sql = `SELECT * FROM posts WHERE id = $1`;
        const result = await this.dbDriver.query(sql, [id]);

        if(!result){
            return null;
        }

        return result.rows[0];
    }
}