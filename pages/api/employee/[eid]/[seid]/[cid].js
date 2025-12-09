// pages/api/employee/[eid].js
import pool from '../../../../../lib/postgres';

export default async function handler(req, res) {
  const { eid, seid, cid } = req.query;

  if (!eid) {
    return res.status(400).json({ error: 'Missing eid' });
  }

  if (!cid) {
      return res.status(400).json({ error: 'Missing caseid' });
  }

  if (!seid) {
      return res.status(400).json({ error: 'Missing seid' });
  }

  try {
    let query = `
      SELECT emp.first_name, emp.last_name, emp.department,
             CONCAT(sup.first_name, ' ', sup.last_name) AS supervisor
      FROM employee AS emp
      LEFT JOIN employee AS sup ON sup.eid = emp.emp_supervisor
      WHERE emp.eid = $1
    `;
    const queryParams = [eid];

    if (seid) {
      query += ` AND emp.emp_supervisor = $2`;
      queryParams.push(seid);
    }

    const { rows } = await pool.query(query, queryParams);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await pool.query(
        `UPDATE cases SET ir_approver_eid = $1 WHERE id = $2`, [eid, cid]
    );

    const employee = rows[0];
    res.status(200).json(employee);
  } catch (error) {
    console.error('PostgreSQL error:', error);
    res.status(500).json({ error: 'Database error' });
  }
}
