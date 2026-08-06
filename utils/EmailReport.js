import nodemailer from 'nodemailer';
import path from 'path';

export async function sendReport() {

    const transporter = nodemailer.createTransport({

        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.OUTLOOK_PASSWORD
        }

    });

    await transporter.sendMail({

        from: process.env.EMAIL_FROM,

        to: process.env.EMAIL_TO,

        cc: process.env.EMAIL_CC,

        subject: 'Playwright Automation Report - Project: Alimentarium',

        text: 'Please find the attached automation execution report.',

        attachments: [
            {
                filename: 'Alimentairum_Automation_TestReport.xlsx',
                path: path.resolve('./reports/Alimentairum_Automation_TestReport.xlsx')
            }
        ]

    });

    console.log("Email sent successfully.");

}