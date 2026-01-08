import { Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config()

export const postDbPool = new Pool({
    host: process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    database : process.env.DATABASE_NAME,
    password : process.env.DATABASE_PASSWORD,
    port : parseInt(process.env.DATABASE_PORT || '5432')
})