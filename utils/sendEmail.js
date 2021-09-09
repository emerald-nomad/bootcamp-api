const nodemailer = require("nodemailer");

/**
 * @typedef {Object} SendEmailParams
 * @property {string} email
 * @property {string} subject
 * @property {string} message
 */

/** @param {SendEmailParams} options*/
const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transport.sendMail(message);

  console.log("message send", info.messageId);
};

module.exports = sendEmail;
