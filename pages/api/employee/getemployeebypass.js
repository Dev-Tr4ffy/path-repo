import pool from '../../../lib/postgres';

export default async function handler(req, res) {
    const { email, eid } = req.query;

    if (!email || !eid) {
        return res.status(400).json({ message: 'Email and Employee ID are required.' });
    }

    try {
        const { rows } = await pool.query(`
            SELECT 
                emp.*, 
                ro.*, 
                concat(emp.first_name, ' ', emp.last_name) as empfullname,                 
                emp.emp_supervisor as seid,
                sup.eid as emp_supervisor_eid,
                CONCAT(sup.first_name,' ', sup.last_name) as emp_supervisor_fullname,
                sup.email as emp_supervisor_email,                
                om.eid as emp_om_eid,
                CONCAT(om.first_name,' ', om.last_name) as emp_om_fullname,
                om.email as emp_om_email,
                
                (select count(*) from employee as empcnt where empcnt.emp_supervisor=emp.eid) as subcount

            FROM employee as emp
            LEFT JOIN role as ro on ro.id = emp.role_id
            LEFT JOIN employee as sup on sup.eid = emp.emp_supervisor
            LEFT JOIN employee as om on om.eid = sup.emp_supervisor
            WHERE emp.email = $1 AND emp.eid::text = $2
            `, [email, eid.toString()]); 
        
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('PostgreSQL error:', error);
        res.status(500).json({ message: 'Database query failed', error: error.message });
    }
}