const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware to parse JSON data
app.use(express.json());

console.log("🚀 [DEBUG] Botpress has triggered saveToCSV action.");

// ✅ Botpress Webhook to receive user data
app.post('/botpress-webhook', (req, res) => {
    const event = req.body;
    
    console.log(event.state.user.name, event.state.user.email, event.state.user.phone);

    const name_u = event.state.user.name;
    const email_u = event.state.user.email;
    const phone_u = event.state.user.phone;

    function saveToCSV(name, email, phone) {
        console.log("📩 [DEBUG] User Data - Name:", name_u);
        console.log("📩 [DEBUG] User Data - Email:", email_u);
        console.log("📩 [DEBUG] User Data - Phone:", phone_u);

        const filePath = path.join(__dirname, 'user_data.txt');
        console.log(`📂 [DEBUG] Target File Path: ${filePath}`);

        const textToSave = `Name: ${name_u}\nEmail: ${email_u}\nPhone: ${phone_u}\n\n`;

        try {
            fs.appendFileSync(filePath, textToSave);
            console.log("✅ [SUCCESS] User data saved successfully in:", filePath);
            return { success: true, message: 'User data saved to text file' };
        } catch (error) {
            console.error("❌ [ERROR] Failed to write to file:", error);
            return { success: false, message: error.message };
        }
    }

    // ✅ Save Data to File
    saveToCSV();

    res.status(200).json({ success: true, message: 'User data saved successfully' });
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
