import { RequestType } from '@prisma/client';

export enum SecurityRequestType {
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
  EMAIL_CHANGE = 'EMAIL_CHANGE',
}

export interface SecurityRequestDTO {
  id: string;

  token: string;
  expires: bigint;
  type: RequestType;

  accountId: string;

  createdAt: Date;
  updatedAt: Date;
}
