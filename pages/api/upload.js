import { IncomingForm } from 'formidable';
import path from 'path';
import pool from '../../lib/postgres'; // PostgreSQL pool import

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public/uploads'),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('File parse error:', err);
      return res.status(500).json({ error: 'File parsing failed' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const caseId = parseInt(fields.case_id);
    const caseType = parseInt(fields.case_type);
    const createdBy = '0';
    
    const originalFilename = file.originalFilename || null;

    if (!caseId || !file?.newFilename || !file?.mimetype) {
      return res.status(400).json({ error: 'Missing file or case_id' });
    }

    try {
      await pool.query(
        `INSERT INTO case_attachments 
         (case_id, case_type, file_name, file_type, file_size, created, created_by, original_filename)
         VALUES ($1, $2, $3, $4, $5, NOW(), $6, $7)`,
        [
          caseId,
          caseType,
          file.newFilename,
          file.mimetype,
          file.size,
          createdBy,
          originalFilename
        ]
      );

      return res.status(200).json({ message: 'File uploaded successfully' });
    } catch (dbErr) {
      console.error('DB insert error:', dbErr);
      return res.status(500).json({ error: 'Database insert failed' });
    }
  });
}
