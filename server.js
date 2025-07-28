
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

const API_KEY = "sk-or-v1-743aa31021e3fb49a1f28e721805a3a475c09de4b67182e1f67c840987315";
const MODEL = "thudm/glm-z1-32b:free";
const URL = "https://openrouter.ai/api/v1/chat/completions";

app.post("/upload", upload.single("file"), async (req, res) => {
  const prompt = req.body.prompt || "";
  const file = req.file;
  const instructions = "Key consideration: Do not start the answer with your usual salutation or add your concluding remarks.";
  const content = `${prompt}. ${instructions}`;

  try {
    const result = await axios.post(URL, {
      model: MODEL,
      messages: [{ role: "user", content }],
    }, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const reply = result.data.choices?.[0]?.message?.content || "No reply received.";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
