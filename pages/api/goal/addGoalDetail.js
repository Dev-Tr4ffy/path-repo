import pool from '../../../lib/postgres';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { goal_header_id, goal, weight_percentage, created_by } = req.body;

    if (!goal_header_id || !goal || !created_by) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await pool.query(
            `INSERT INTO thrivepath_goal_details (goal_header_id, goal, weight_percentage, created_by, created_at, updated_by, updated_at, status)
             VALUES ($1, $2, $3, $4, NOW(), $4, NOW(), 1)`,
            [goal_header_id, goal, weight_percentage || null, created_by]
        );

        res.status(201).json({ message: 'Goal detail added successfully' });

    } catch (error) {
        console.error('DB error:', error);
        res.status(500).json({ error: 'Database error' });
    }
}
