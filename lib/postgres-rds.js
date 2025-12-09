import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    port: process.env.PG_PORT || 5432,  // Making port configurable with a default
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('/home/ec2-user/ap-east-1-bundle.pem').toString(),
    }
});

export default pool;