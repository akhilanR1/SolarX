const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');
const XLSX = require('xlsx');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());


const httpsOptions = {
    key: fs.readFileSync('/Users/akhilan/Documents/Grade 11 - Resources/Computer Science/SolarX Project/server.key'),
    cert: fs.readFileSync('/Users/akhilan/Documents/Grade 11 - Resources/Computer Science/SolarX Project/server.crt')
};



app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'project.html'));
});

app.get('/getExcelData', (req, res) => {
    const workbook = XLSX.readFile(path.join(__dirname, 'customers.xlsx'));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    res.json(jsonData);
});

https.createServer(httpsOptions, app).listen(443, '0.0.0.0', () => {
    console.log('HTTPS server running on https://solarx.project');
});



app.post('/send-otp', async (req, res) => {
    const { username } = req.body;

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
        text: `
            Hello ${user.name},
    
            Your OTP code is ${otp}
    
            Please enter this code on the website to confirm your payment.
    
            If you think this email is an error, please call our helpline number: 052 135 7447
        `
    };


    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent to email:', user.email);
        res.json({ success: true, otp });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
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



