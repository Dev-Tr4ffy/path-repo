import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, cc, bcc, placeholders } = req.body;

    
    const filePath = path.join(process.cwd(), 'public', 'general-email.html');
    let html = fs.readFileSync(filePath, 'utf-8');

    
    for (const key in placeholders) {
      const value = placeholders[key];
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, value);
    }

    
    const emailRes = await fetch('https://erms-mail.fpsinc.com/mailservice/index.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, cc, bcc, body: html }),
    });

    console.log(JSON.stringify({ to, subject, cc, bcc, body: html }));

    const result = await emailRes.json();
    if (!emailRes.ok) throw new Error(result.message || 'Mail service failed');

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
