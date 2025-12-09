import pool from '../../../lib/postgres';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { review_year, created_by, details } = req.body;

    if (!review_year || !created_by || !Array.isArray(details)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const headerInsert = await client.query(
            `INSERT INTO thrivepath_goal_header (review_year, created_by, created_at, updated_by, updated_at, status)
             VALUES ($1, $2, NOW(), $2, NOW(), 1)
             RETURNING id`,
            [review_year, created_by]
        );

        const goal_header_id = headerInsert.rows[0].id;

        for (const d of details) {
            await client.query(
                `INSERT INTO thrivepath_goal_details (goal_header_id, goal, weight_percentage, created_by, created_at, updated_by, updated_at, status)
                 VALUES ($1, $2, $3, $4, NOW(), $4, NOW(), 1)`,
                [goal_header_id, d.goal, d.weight_percentage, created_by]
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'Goal created successfully', goal_header_id });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('DB error:', error);
        res.status(500).json({ error: 'Database error' });
    } finally {
        client.release();
    }
}
