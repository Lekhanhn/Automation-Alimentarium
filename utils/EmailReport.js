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

        //bcc: process.env.EMAIL_BCC,

        subject: 'Playwright Automation Report - Project: Alimentarium',

        html: `
        
        <p>Hello Team,</p>

        <p>Please find the attached <b>Automation Execution Report</b>.</p>

        <br/>

        <p>
        Regards,<br>
        Playwright Automation Framework
        </p> `
        ,

        attachments: [
            {
                filename: 'Alimentarium_TestReport.xlsx',
                path: path.resolve('./reports/Alimentarium_TestReport.xlsx')
            }
        ]

    });

    //console.log("Email sent successfully.");

}