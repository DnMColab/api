import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

interface MailParams {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html: string;
}

@Injectable()
export class MailService {
  constructor(
    public readonly resend: Resend = new Resend(process.env.RESEND_API_KEY),
  ) {}

  public async sendMail(params: MailParams) {
    await this.resend.emails.send(params);
  }

  public async sendVerificationEmail(
    email: string,
    params: { id: string; token: string },
  ) {
    try {
      const link = `${process.env.APP_URL}/verify/${params.id}/${params.token}`;

      await this.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: 'Verify your account',
        html: `<p>Click <a href="${link}">here</a> to verify your account</p>`,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
