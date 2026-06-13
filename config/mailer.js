import nodemailer from 'nodemailer';

// Create the transporter using Gmail service
// Helper to get transporter dynamically (ensuring process.env is populated)
const getTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : '',
      pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim() : ''
    }
  });
};

/**
 * Sends an email notification when a new contact form message is received.
 * @param {Object} data - The contact message data.
 * @param {string} data.name - The name of the sender.
 * @param {string} data.email - The email address of the sender.
 * @param {string} data.message - The message content.
 */
export const sendContactEmail = async ({ name, email, message }) => {
  const transporter = getTransporter();
  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    subject: `New Portfolio Message from ${name}`,
    replyTo: email, // Allows replying directly to the sender from your email client
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f6f9fc;
            margin: 0;
            padding: 0;
            color: #334155;
          }
          .container {
            max-width: 1000px;
            width: 95%;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          .header {
            background: linear-gradient(135deg, #0d9488 0%, #0891b2 100%);
            padding: 30px;
            text-align: center;
            color: #ffffff;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
          }
          .content {
            padding: 30px;
          }
          .field {
            margin-bottom: 20px;
          }
          .label {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #64748b;
            margin-bottom: 4px;
          }
          .value {
            font-size: 16px;
            color: #1e293b;
            line-height: 1.5;
          }
          .value.message-box {
            background-color: #f8fafc;
            border-left: 4px solid #0d9488;
            padding: 15px;
            border-radius: 4px;
            white-space: pre-wrap;
            color: #334155;
          }
          .footer {
            background-color: #f8fafc;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #94a3b8;
          }
          .footer a {
            color: #0d9488;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Portfolio Contact</h2>
            <p>You have received a new message from your website contact form</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Sender Name</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Message</div>
              <div class="value message-box">${message}</div>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #0d9488; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);">
                Reply to ${name} &rarr;
              </a>
            </div>
          </div>
          <div class="footer">
            <p>Sent from your Portfolio Server at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
};
