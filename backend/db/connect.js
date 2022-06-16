// env setup
import dotenv from 'dotenv'
dotenv.config()


import mysql from 'mysql';
// console.log(process.env.DB_PASSWORD,"password")

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
})

export default db