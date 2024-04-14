/**
 * This file contains the MailService class which is responsible for sending emails using the Resend API.
 *
 * If you have own email service, you can replace the Resend API with your own service or use the Nodemailer library to send emails.
 */

import { Injectable } from '@nestjs/common';
import { RequestType } from '@prisma/client';
import { Resend } from 'resend';

interface _MailParams {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html: string;
  [key: string]: any;
}

const MailTemplates = {
  EMAIL_VERIFICATION: (link: string) =>
    `<p>Click <a href="${link}">here</a> to verify your account</p>`,
  PASSWORD_CHANGE: (link: string) =>
    `<p>Click <a href="${link}">here</a> to change your password</p>`,
  EMAIL_CHANGE: (link: string) =>
    `<p>Click <a href="${link}">here</a> to change your email</p>`,
};

@Injectable()
export class MailService {
  constructor(
    public readonly resend: Resend = new Resend(process.env.RESEND_API_KEY),
  ) {}

  public async sendMail(
    to: string,
    params: { subject: string; [name: string]: string },
    reason: RequestType,
  ) {
    if (reason in Object.keys(MailTemplates) && !params.link) {
      throw new Error('Link is required for this email type');
    }

    await this.resend.emails.send({
      from: process.env.MAIL_FROM,
      to,
      subject: params.subject,
      html: MailTemplates[reason](params.link),
    });
  }
}
