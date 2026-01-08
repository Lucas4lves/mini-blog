import { Post } from "../models/Post"
import { Result } from "../models/Result"
import { Pool } from "pg"
import { writeUpdateStatetement } from "../utils/writeSetStatement.js"

export class PostRepository {
    private dbDriver : Pool

    constructor(driver : Pool){
        this.dbDriver = driver
    }

    selectAll = async () : Promise<Result<Post[]>> => {
        const sql = `SELECT * FROM POSTS ORDER BY id DESC`;

        try{
            const results = await this.dbDriver.query(sql);
            if(results.rowCount === 0){
                return {
                    success : false,
                    error: `Could not retrieve records from the database!`
                }
            }

            return {
                success: true,
                data: results.rows
            }
        }catch(err){
            return {
                success : false,
                error: String(err)
            }
        }
    }

    selectById = async (id : number) : Promise<Result<Post>> => {
        const sql = `SELECT * FROM posts WHERE id = $1`;
        try{
            const result = await this.dbDriver.query(sql, [id]);
            if(result.rowCount === 0){
                return { success: false, error: `A record with id ${id} was not found.`}
            }

            return { success: true, data: result.rows[0]}
        }catch(err){
            return { success: false, error: `ERROR: ${String(err)}`}
        }
    }

    update = async (id : number, updates : Omit<Post, 'id' | 'created_at' | 'updated_at'>) : Promise<Result<Post>> => {

        const fieldsToUpdate = Object.keys(updates);
        const valuesToUpdate = Object.values(updates);

        const updateStmt = writeUpdateStatetement(fieldsToUpdate);

        const sql = `UPDATE posts SET ${updateStmt}, updated_at = NOW() where id = $${fieldsToUpdate.length + 1} RETURNING *`

        try{
            const updatedRecord = await this.dbDriver.query(sql, [...valuesToUpdate, id])
            
            if(updatedRecord.rowCount === 0){
                return {
                    success: false,
                    error: `Post with id ${id} does not exist!`
                }
            }
            return {
                success : true,
                data: updatedRecord.rows[0]
            };
        }catch(error){
            return {
                success: false,
                error: String(error)
            }
        }
    }
}