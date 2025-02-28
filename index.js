//console.log("🚀 [DEBUG] Botpress has triggered saveToCSV action.");
//console.log("✅ [SUCCESS] Hello World");
console.log(event.state.user.name, event.state.user.email, event.state.user.phone)

const fs = require('fs');
const path = require('path');
const name_u = event.state.user.name;
const email_u = event.state.user.email;
const phone_u = event.state.user.phone;

function saveToCSV(name, email, phone) {
    console.log("🚀 [DEBUG] Botpress has triggered saveToCSV action.");

    console.log("📩 [DEBUG] User Data - Name:", name_u);
    console.log("📩 [DEBUG] User Data - Email:", email_u);
    console.log("📩 [DEBUG] User Data - Phone:", phone_u);

    // ✅ Define text file path
    const filePath = path.join(__dirname, 'user_data.txt');

    console.log(`📂 [DEBUG] Target File Path: ${filePath}`);

    // ✅ Format the text to save
    const textToSave = `Name: ${name_u}\nEmail: ${email_u}\nPhone: ${phone_u}\n\n`;

    // ✅ Append user data to text file
    try {
        fs.appendFileSync(filePath, textToSave);
        console.log("✅ [SUCCESS] User data saved successfully in:", filePath);
        return { success: true, message: 'User data saved to text file' };
    } catch (error) {
        console.error("❌ [ERROR] Failed to write to file:", error);
        return { success: false, message: error.message };
    }
}

// ✅ Export function for Botpress
saveToCSV();
