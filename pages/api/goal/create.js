import pool from '../../../lib/postgres';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const {
        review_year,
        goal,
        weight_percentage,
        created_by,
        updated_by,
        employee_eid,
    } = req.body || {};

    try {
        // Basic validation and normalization
        if (!goal || typeof goal !== 'string' || !goal.trim()) {
            return res.status(400).json({ error: 'goal is required' });
        }
        if (!created_by) {
            return res.status(400).json({ error: 'created_by is required' });
        }

        const reviewYearInt = review_year ? parseInt(review_year, 10) : new Date().getFullYear();
        const createdByInt = parseInt(created_by, 10);
        const updatedByInt = updated_by ? parseInt(updated_by, 10) : createdByInt;

        if (Number.isNaN(createdByInt)) {
            return res.status(400).json({ error: 'created_by must be a number' });
        }
        if (Number.isNaN(updatedByInt)) {
            return res.status(400).json({ error: 'updated_by must be a number' });
        }
        if (review_year && Number.isNaN(reviewYearInt)) {
            return res.status(400).json({ error: 'review_year must be a number' });
        }

        let weightNumeric = null;
        if (weight_percentage !== undefined && weight_percentage !== null && weight_percentage !== '') {
            weightNumeric = Number(weight_percentage);
            if (Number.isNaN(weightNumeric) || weightNumeric < 0 || weightNumeric > 100) {
                return res.status(400).json({ error: 'weight_percentage must be a number between 0 and 100' });
            }
        }

        if (employee_eid && typeof employee_eid !== 'string') {
            return res.status(400).json({ error: 'employee_eid must be a string' });
        }
        if (employee_eid && employee_eid.length > 50) {
            return res.status(400).json({ error: 'employee_eid exceeds 50 characters' });
        }
        if (goal.length > 255) {
            return res.status(400).json({ error: 'goal exceeds 255 characters' });
        }

        // Insert
        const insertSql = `
        INSERT INTO thrivepath_goals
            (review_year, goal, weight_percentage, created_by, updated_by, employee_eid)
        VALUES
            ($1, $2, $3, $4, $5, $6)
        RETURNING id, review_year, goal, weight_percentage, created_by, created_at, updated_by, updated_at, employee_eid
        `;
        const params = [
            reviewYearInt,
            goal.trim(),
            weightNumeric,
            createdByInt,
            updatedByInt,
            employee_eid || null,
        ];

        const { rows } = await pool.query(insertSql, params);

        return res.status(201).json({
            success: true,
            goal: rows[0],
        });

    } catch (error) {
        console.error('PostgreSQL insert error:', error);
        return res.status(500).json({ error: 'Database error', details: error.message });
    }
}