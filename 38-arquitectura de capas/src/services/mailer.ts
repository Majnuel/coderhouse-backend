import config from "../config";
import nodemailer from "nodemailer";
import { logger } from "./logger";

class Email {
  private owner;
  private transporter;

  constructor() {
    this.owner = {
      name: config.GMAIL_EMAIL,
      address: config.GMAIL_EMAIL,
    };

    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.GMAIL_EMAIL,
        pass: config.GMAIL_APP_PASSWORD,
      },
    });

    this.transporter.verify().then(() => logger.info("EMAIL SERVICE READY"));
  }

  async sendEmail(dest: string, subject: string, content: string) {
    const mailOptions = {
      from: this.owner,
      to: dest,
      subject,
      html: content,
    };

    const response = await this.transporter.sendMail(mailOptions);
    return response;
  }
}

export const EmailService = new Email();
