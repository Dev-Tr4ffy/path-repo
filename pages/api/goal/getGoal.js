import pool from '../../../lib/postgres';

export default async function handler(req, res) {
    const { goal_header_id } = req.query;

    if (!goal_header_id) {
        return res.status(400).json({ error: 'Missing goal_header_id' });
    }

    try {
        const goalHeader = await pool.query(
            `SELECT * FROM thrivepath_goal_header WHERE id = $1`,
            [goal_header_id]
        );

        if (goalHeader.rows.length === 0) {
            return res.status(404).json({ error: 'Goal header not found' });
        }

        const goalDetails = await pool.query(
            `SELECT * FROM thrivepath_goal_details WHERE goal_header_id = $1`,
            [goal_header_id]
        );

        const employees = await pool.query(
            `SELECT e.eid, e.first_name, e.last_name, e.department
             FROM thrivepath_goal_employee ge
             JOIN employee e ON e.eid = ge.employee_eid
             WHERE ge.goal_header_id = $1`,
            [goal_header_id]
        );

        res.status(200).json({
            header: goalHeader.rows[0],
            details: goalDetails.rows,
            employees: employees.rows
        });
        
    } catch (error) {
        console.error('DB error:', error);
        res.status(500).json({ error: 'Database error' });
    }
}
