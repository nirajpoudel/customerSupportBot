//console.log("🚀 [DEBUG] Botpress has triggered saveToCSV action.");
//console.log("✅ [SUCCESS] Hello World");
console.log(event.state.user.name, event.state.user.email, event.state.user.phone)
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Serve `botpress.html`
app.use(express.static(path.join(__dirname, '../public')));

// ✅ Handle user data saving
app.use(express.json());

app.post('/save-user', (req, res) => {
    const { name, email, phone } = req.body;

    console.log("📩 [DEBUG] User Data - Name:", name);
    console.log("📩 [DEBUG] User Data - Email:", email);
    console.log("📩 [DEBUG] User Data - Phone:", phone);

    const filePath = path.join(__dirname, 'user_data.txt');

    const textToSave = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n`;

    try {
        fs.appendFileSync(filePath, textToSave);
        console.log("✅ [SUCCESS] User data saved successfully in:", filePath);
        res.status(200).json({ success: true, message: 'User data saved' });
    } catch (error) {
        console.error("❌ [ERROR] Failed to write to file:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
