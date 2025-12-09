// pages/api/signature.js
import fs from 'fs';
import path from 'path';
import md5 from 'md5';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { imageData, userEid } = req.body;

    if (!imageData || !userEid) {
        return res.status(400).json({ message: 'Missing imageData or userEid' });
    }

    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    const filename = md5(userEid) + '.png';

    try {
        const dir = path.join(process.cwd(), 'public', 'signatures');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const filePath = path.join(dir, filename);
        fs.writeFileSync(filePath, base64Data, 'base64');

        res.status(200).json({ message: 'File saved successfully', filename });
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).json({ message: 'Error saving the file', error: error.message });
    }
}
