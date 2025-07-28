
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/evaluate', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const fileName = req.file.originalname;

        const prompt = `Please evaluate the following document "${fileName}".`;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'thudm/glm-z1-32b:free',
                messages: [{ role: 'user', content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        fs.unlinkSync(filePath); // Clean up

        res.json({ feedback: response.data.choices[0].message.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
