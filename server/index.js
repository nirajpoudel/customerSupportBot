const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware to parse JSON requests from Botpress
app.use(express.json());

// ✅ Serve static files from '../public' (Fixes "Cannot GET /" error)
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Serve `botpress.html` at the root `/`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'botpress.html'));
});

// ✅ Botpress Webhook to receive user data
app.post('/botpress-webhook', (req, res) => {
    const event = req.body;

    console.log("📩 [DEBUG] Botpress Webhook Received:", event);

    const name_u = event?.state?.user?.name || "Unknown";
    const email_u = event?.state?.user?.email || "Unknown";
    const phone_u = event?.state?.user?.phone || "Unknown";

    console.log("📩 [DEBUG] User Data - Name:", name_u);
    console.log("📩 [DEBUG] User Data - Email:", email_u);
    console.log("📩 [DEBUG] User Data - Phone:", phone_u);

    const filePath = path.join(__dirname, '../user_data.txt');
    console.log(`📂 [DEBUG] Target File Path: ${filePath}`);

    const textToSave = `Name: ${name_u}\nEmail: ${email_u}\nPhone: ${phone_u}\n\n`;

    try {
        fs.appendFileSync(filePath, textToSave);
        console.log("✅ [SUCCESS] User data saved successfully!");
        res.status(200).json({ success: true, message: 'User data saved successfully' });
    } catch (error) {
        console.error("❌ [ERROR] Failed to write to file:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
