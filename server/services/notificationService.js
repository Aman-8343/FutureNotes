import nodemailer from 'nodemailer';
import Capsule from '../models/Capsule.js';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function checkAndSendNotifications() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
        const capsulesToUnlock = await Capsule.find({
            unlockDate: { $gte: today, $lt: tomorrow },
            notified: false,
        }).populate('user', 'email name');

        for (const capsule of capsulesToUnlock) {
            if (capsule.user) {
                const mailOptions = {
                    from: `"Time Capsule App" <${process.env.EMAIL_USER}>`,
                    to: capsule.user.email,
                    subject: `Your Time Capsule "${capsule.title}" has unlocked! 📬`,
                    html: `
                        <h1>Hello ${capsule.user.name},</h1>
                        <p>The day has arrived! Your time capsule titled "<b>${capsule.title}</b>" is now unlocked.</p>
                        <p>Log in to the app to see the message and file you saved for your future self.</p>
                    `
                };

                await transporter.sendMail(mailOptions);
                console.log(`Notification sent for capsule: ${capsule.title}`);

                capsule.notified = true;
                capsule.isUnlocked = true;
                await capsule.save();
            }
        }
    } catch (error) {
        console.error('Error sending notifications:', error);
    }
}