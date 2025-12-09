import pool from '../../../lib/postgres';

export default async function handler(req, res) {
    try {
        const { rows } = await pool.query(`SELECT id, name, om_eid FROM department ORDER BY name`);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Department fetch error:', error);
        res.status(500).json({ error: 'Database error' });
    }
}
