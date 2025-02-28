const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Serve Static Files (Make sure botpress.html is inside 'public' folder)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Serve botpress.html at the root `/`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'botpress.html'));
});

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
        } catch (error) {
            console.error("❌ [ERROR] Failed to write to file:", error);
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
