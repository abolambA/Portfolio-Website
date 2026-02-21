require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Resend
// Note: You must provide your own API key in a .env file.
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Default 'from' address must be associated with your verified domain in Resend
        // or onboarding@resend.dev for testing.
        const data = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: ['mn121529@gmail.com'], // Deliver to the user's email
            subject: subject || `New message from ${name}`,
            html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
        });

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Resend Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Email API server running on http://localhost:${port}`);
        console.log(`Ensure RESEND_API_KEY is set in your .env file.`);
    });
}

module.exports = app;
