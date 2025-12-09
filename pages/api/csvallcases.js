import pool from '../../lib/postgres';
import { parse } from 'json2csv';

export default async function handler(req, res) {
  const {
    exportCsv,
    search = "",
    caseType,
    status,
    name,
    department,
    userEid,
    rid
  } = req.query;

  try {
    let query = `
      SELECT cs.*,  
            dept.name AS department,
            TO_CHAR(cs.ir_incident_date, 'Month DD, YYYY') AS incidentdate,
            CONCAT(emp.first_name, ' ', emp.last_name) AS emp_name,              
            CASE 
                WHEN cs.ir_status_id = 0 THEN 'Draft'
                WHEN cs.ir_id IS NULL THEN NULL
                ELSE CONCAT('IR', LPAD(cs.ir_id::text, 7, '0'))
            END AS irrefno, 
            cs.ir_id,             
            CASE 
                WHEN cs.nte_status_id = 0 THEN 'Draft'
                WHEN cs.nte_id IS NULL THEN NULL
                ELSE CONCAT('NTE', LPAD(cs.nte_id::text, 7, '0'))
            END AS nterefno,     
            cs.nte_id,         
            CASE 
                WHEN cs.nod_status_id = 0 THEN 'Draft'
                WHEN cs.nod_id IS NULL THEN NULL
                ELSE CONCAT('NOD', LPAD(cs.nod_id::text, 7, '0'))
            END AS nodrefno,
            cs.nod_id,
            cl.is_terminable,

            -- Latest Status
            CASE
              WHEN cs.nod_status_id = 4 AND cl.is_terminable = 1 THEN '2nd NOD Approved'
              WHEN cs.nod_status_id = 3 AND cl.is_terminable = 1 THEN 'NOD Approved, waiting for 2nd Approval'
              WHEN cs.nod_status_id = 3 AND cl.is_terminable = 0 THEN 'NOD Approved'
              WHEN cs.nod_status_id = 2 THEN 'NOD For Approval'
              WHEN cs.nod_status_id = 1 THEN 'NOD Submitted'
              WHEN cs.nod_status_id = 0 THEN 'NOD Draft'
              WHEN cs.nte_status_id = 3 AND cl.is_terminable = 1 AND cs.noh_status_id = 1 THEN 'NTE Approved, Hearing Scheduled'
              WHEN cs.nte_status_id = 3 AND cl.is_terminable = 1 AND cs.noh_status_id = 0 THEN 'NTE Approved, waiting for Hearing Schedule'
              WHEN cs.nte_status_id = 3 AND cl.is_terminable = 0 THEN 'NTE Approved'
              WHEN cs.nte_status_id = 2 THEN 'NTE For Approval'
              WHEN cs.nte_status_id = 1 THEN 'NTE Submitted'
              WHEN cs.nte_status_id = 0 THEN 'NTE Draft'
              WHEN cs.ir_status_id = 3 THEN 'IR Approved'
              WHEN cs.ir_status_id = 2 THEN 'IR For Approval'
              WHEN cs.ir_status_id = 1 THEN 'IR Submitted'
              WHEN cs.ir_status_id = 0 THEN 'IR Draft'
              ELSE 'Status Unknown'
            END AS lateststatus,

            -- Status ID
            CASE
              WHEN cs.nod_status_id = 4 AND cl.is_terminable = 1 THEN 4
              WHEN cs.nod_status_id = 3 AND cl.is_terminable = 1 THEN 3
              WHEN cs.nod_status_id = 3 AND cl.is_terminable = 0 THEN 3
              WHEN cs.nod_status_id = 2 THEN 2
              WHEN cs.nod_status_id = 1 THEN 1
              WHEN cs.nod_status_id = 0 THEN 0
              WHEN cs.nte_status_id = 3 AND cl.is_terminable = 1 AND cs.noh_status_id = 1 THEN 3
              WHEN cs.nte_status_id = 3 AND cl.is_terminable = 1 AND cs.noh_status_id = 0 THEN 3
              WHEN cs.nte_status_id = 3 AND cl.is_terminable = 0 THEN 3
              WHEN cs.nte_status_id = 2 THEN 2
              WHEN cs.nte_status_id = 1 THEN 1
              WHEN cs.nte_status_id = 0 THEN 0
              WHEN cs.ir_status_id = 3 THEN 3
              WHEN cs.ir_status_id = 2 THEN 2
              WHEN cs.ir_status_id = 1 THEN 1
              WHEN cs.ir_status_id = 0 THEN 0
              ELSE NULL
            END AS lateststatusid,

            sup.eid as supervisoreid,
            CONCAT(sup.first_name, ' ', sup.last_name) AS supervisorname, 
            om.eid as omeid,
            CONCAT(om.first_name, ' ', om.last_name) AS omname,
            vio.violation_name,
            cl.class_name,
            sanc.sanction_name,

            -- Aging
            CASE 
              WHEN cs.nte_status_id != 3 THEN NULL
              WHEN cs.nte_employee_acknowledged = 1 THEN 
                CASE 
                  WHEN cs.nod_created IS NOT NULL THEN 
                    DATE_PART('day', cs.nod_created - cs.nte_employee_acknowledged_date)
                  ELSE 
                    DATE_PART('day', CURRENT_DATE - cs.nte_employee_acknowledged_date)
                END
              ELSE NULL
            END AS aging,

            -- Aging Level
            CASE
              WHEN cs.nte_status_id != 3 OR cs.nte_employee_acknowledged != 1 THEN NULL
              ELSE
                CASE 
                  WHEN cl.is_terminable = 0 THEN
                    CASE
                      WHEN (cs.nod_created IS NOT NULL AND DATE_PART('day', cs.nod_created - cs.nte_employee_acknowledged_date) > 11) 
                        OR (cs.nod_created IS NULL AND DATE_PART('day', CURRENT_DATE - cs.nte_employee_acknowledged_date) > 11)
                        THEN 'CRITICAL'
                      WHEN (cs.nod_created IS NOT NULL AND DATE_PART('day', cs.nod_created - cs.nte_employee_acknowledged_date) BETWEEN 6 AND 10)
                        OR (cs.nod_created IS NULL AND DATE_PART('day', CURRENT_DATE - cs.nte_employee_acknowledged_date) BETWEEN 6 AND 10)
                        THEN 'HIGH'
                      WHEN (cs.nod_created IS NOT NULL AND DATE_PART('day', cs.nod_created - cs.nte_employee_acknowledged_date) BETWEEN 4 AND 5)
                        OR (cs.nod_created IS NULL AND DATE_PART('day', CURRENT_DATE - cs.nte_employee_acknowledged_date) BETWEEN 4 AND 5)
                        THEN 'MEDIUM'
                      ELSE 'LOW'
                    END
                  ELSE
                    CASE
                      WHEN (cs.nod_created IS NOT NULL AND DATE_PART('day', cs.nod_created - cs.nte_employee_acknowledged_date) > 30) 
                        OR (cs.nod_created IS NULL AND DATE_PART('day', CURRENT_DATE - cs.nte_employee_acknowledged_date) > 30)
                        THEN 'CRITICAL'
                      WHEN (cs.nod_created IS NOT NULL AND DATE_PART('day', cs.nod_created - cs.nte_employee_acknowledged_date) BETWEEN 20 AND 29)
                        OR (cs.nod_created IS NULL AND DATE_PART('day', CURRENT_DATE - cs.nte_employee_acknowledged_date) BETWEEN 20 AND 29)
                        THEN 'HIGH'
                      WHEN (cs.nod_created IS NOT NULL AND DATE_PART('day', cs.nod_created - cs.nte_employee_acknowledged_date) BETWEEN 15 AND 19)
                        OR (cs.nod_created IS NULL AND DATE_PART('day', CURRENT_DATE - cs.nte_employee_acknowledged_date) BETWEEN 15 AND 19)
                        THEN 'MEDIUM'
                      ELSE 'LOW'
                    END
                END
            END AS aginglevel

      FROM cases cs  
      LEFT JOIN employee emp ON emp.eid = cs.emp_id
      LEFT JOIN employee sup ON sup.eid = emp.emp_supervisor
      LEFT JOIN employee om ON om.eid = sup.emp_supervisor
      LEFT JOIN class cl ON cl.id = cs.nte_class_id
      LEFT JOIN department dept ON dept.id = emp.department_id
      LEFT JOIN violation vio ON vio.id = cs.nte_violation_id
      LEFT JOIN sanction sanc ON sanc.id = cs.nod_sanction_id

      WHERE (
        cs.ir_what ILIKE $1 OR 
        cs.ir_why ILIKE $2 OR 
        cs.emp_id ILIKE $3 OR 
        (emp.first_name || ' ' || emp.last_name) ILIKE $4 OR 
        (sup.first_name || ' ' || sup.last_name) ILIKE $5 OR 
        (om.first_name || ' ' || om.last_name) ILIKE $6 OR 
        dept.name ILIKE $7
      )
    `;

    const values = [
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
    ];

    let index = 8;

    if (caseType) {
      if (caseType === '1') {
        query += ` AND cs.ir_id IS NOT NULL`;
      } else if (caseType === '2') {
        query += ` AND cs.nte_id IS NOT NULL`;
      } else if (caseType === '3') {
        query += ` AND cs.nod_id IS NOT NULL`;
      }
    }

    if (name) {
      query += ` AND (emp.first_name ILIKE $${index} OR emp.last_name ILIKE $${index + 1})`;
      values.push(`%${name}%`, `%${name}%`);
      index += 2;
    }

    if (status) {
      query += ` AND (
        cs.ir_status_id = $${index} OR
        cs.nte_status_id = $${index + 1} OR
        cs.nod_status_id = $${index + 2}
      )`;
      values.push(status, status, status);
      index += 3;
    }

    if (department) {
      query += ` AND dept.id = $${index}`;
      values.push(department);
      index++;
    }
    console.log(query);
    console.log(values);
    const { rows } = await pool.query(query, values);
    console.log("Number of rows:", rows.length);
    console.log("Sample row:", rows[0]); // Log the first row to inspect the data structure

    if (exportCsv === 'true') {
      const csv = parse(rows, {
        fields: [
          { label: 'IR REFNO', value: 'irrefno' },
          { label: 'NTE REFNO', value: 'nterefno' },
          { label: 'NOD REFNO', value: 'nodrefno' },
          { label: 'EID', value: 'eid' },
          { label: 'EMPLOYEE', value: 'emp_name' },
          { label: 'SUPERVISOR', value: 'supervisorname' },
          { label: 'SECONDARY SUPERVISOR', value: 'omsupervisorname' },
          { label: 'DEPARTMENT', value: 'department' },
          { label: 'VIOLATION', value: 'violation_name' },
          { label: 'CLASS', value: 'class_name' },
          { label: 'SANCTION', value: 'sanction_name' },
          { label: 'AGING', value: 'aging' },
          { label: 'LEVEL', value: 'aginglevel' },
          { label: 'STATUS', value: 'lateststatus' }
        ]
      });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="cases.csv"');
      res.status(200).send(csv);
      return;
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    console.error('CSV Export Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
}