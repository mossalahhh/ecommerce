import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html, attachments }) => {
  const transport = nodemailer.createTransport({
    host: "localhost",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const info = await transport.sendMail({
    from: `"Ecommerce" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
    attachments,
  });

  if (info.accepted.length > 0) {
    return true;
  } else {
    return false;
  }
};
