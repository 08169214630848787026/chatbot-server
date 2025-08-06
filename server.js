// server.js - Simplified Version
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${GEMINI_API_KEY}`;

app.post('/api/chat', async (req, res) => {
  console.log("ได้รับคำขอที่ /api/chat (เวอร์ชันง่าย)");
  try {
    // รับแค่ contents อย่างเดียว
    const { contents } = req.body;

    // ส่งแค่ contents ไปที่ Gemini API
    const response = await axios.post(GEMINI_API_URL, { contents });

    res.json(response.data);

  } catch (error) {
    console.error("เกิดข้อผิดพลาดใน /api/chat:", error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสื่อสารกับ AI' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});