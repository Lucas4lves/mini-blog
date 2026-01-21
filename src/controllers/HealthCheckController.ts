import { Pool } from "pg";
import { Request, Response } from "express";

export class HealthCheckController{
    private dbConn : Pool;

    constructor(dbConn : Pool){
        this.dbConn = dbConn;
    }

    run = async ( req : Request, res : Response ) =>{
        const sql = `SELECT 1`;

        try{
            const result = await this.dbConn.query(sql);
            return res.status(200).json({
                success: true,
                message: {
                    healthy : true
                }
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message: {
                    healthy : false
                }
            })
        }
    }
}