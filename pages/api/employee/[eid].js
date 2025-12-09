import pool from '../../../lib/postgres';

export default async function handler(req, res) {
    const { eid } = req.query;

    if (!eid) {
        return res.status(400).json({ error: 'Missing eid' });
    }

    try {
        const { rows } = await pool.query(
            `SELECT emp.first_name, emp.last_name, emp.department, concat(sup.first_name, ' ', sup.last_name) as supervisor
            FROM employee AS emp 
            LEFT JOIN employee AS sup ON sup.eid::text = emp.emp_supervisor::text
            WHERE emp.eid::text = $1`,
            [eid.toString()]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const employee = rows[0];
        res.status(200).json(employee);
    } catch (error) {
        console.error('PostgreSQL error:', error);
        res.status(500).json({ error: 'Database error' });
    }
}