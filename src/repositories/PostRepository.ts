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
}