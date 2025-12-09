import pool from '../../../lib/postgres';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { goal_header_id, employee_eid, created_by } = req.body;

    if (!goal_header_id || !employee_eid || !created_by) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await pool.query(
            `INSERT INTO thrivepath_goal_employee (goal_header_id, employee_eid, created_by, created_at, updated_by, updated_at, status)
             VALUES ($1, $2, $3, NOW(), $3, NOW(), 1)`,
            [goal_header_id, employee_eid, created_by]
        );

        res.status(201).json({ message: 'Employee assigned successfully' });

    } catch (error) {
        console.error('DB error:', error);
        res.status(500).json({ error: 'Database error' });
    }
}
