import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: 'Spokeny <noreply@spokeny.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.htmlMessage,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
