const fs = require('fs');
const express = require('express');
const path = require('path');
const XLSX = require('xlsx');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'project.html'));
});

app.get('/getExcelData', (req, res) => {
    try {
        const workbook = XLSX.readFile(path.join(__dirname, 'customers.xlsx'));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        res.json(jsonData);
    } catch (error) {
        console.error("Error reading Excel file:", error);
        res.status(500).json({ success: false, message: "Error reading Excel file" });
    }
});

app.post('/send-otp', async (req, res) => {
    const { username } = req.body;

    try {
        const workbook = XLSX.readFile(path.join(__dirname, 'customers.xlsx'));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const customers = XLSX.utils.sheet_to_json(worksheet);
        const user = customers.find(c => c.username === username);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'otpfromsolarx@gmail.com',
                pass: 'phsupqmwjxpcpdrz' 
            }
        });

        const mailOptions = {
            from: 'otpfromsolarx@gmail.com',
            to: user.email,
            subject: 'Your OTP Code',
            text: `Hello ${user.name},\n\nYour OTP code is ${otp}\n\nPlease enter this code on the website to confirm your payment.\n\nIf you think this email is an error, please call our helpline: 052 135 7447`
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP sent to:', user.email);
        res.json({ success: true, otp });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt: Username = ${username}, Password = ${password}`);

    try {
        const workbook = XLSX.readFile(path.join(__dirname, 'customers.xlsx'));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const customers = XLSX.utils.sheet_to_json(worksheet);

        const user = customers.find(c => c.username.trim() === username.trim() && c.password.trim() === password.trim());

        if (user) {
            console.log("Login successful for user:", username);
            res.json({ success: true });
        } else {
            console.log("Login failed for user:", username);
            res.json({ success: false, message: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Server error during login:", error);
        res.status(500).json({ success: false, message: "Server error during login" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
