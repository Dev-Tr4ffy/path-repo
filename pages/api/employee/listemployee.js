import pool from '../../../lib/postgres';

export default async function handler(req, res) {
  try {
    const { searchTerm } = req.query;
    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }

    const query = `
      SELECT eid, first_name || ' ' || last_name AS full_name
      FROM employee
      WHERE first_name || ' ' || last_name ILIKE $1
      ORDER BY full_name
      LIMIT 10;
    `;
    const values = [`%${searchTerm}%`];
  
    const { rows } = await pool.query(query, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Employee search error:', error);
    res.status(500).json({ error: 'Database error' });
  }
}