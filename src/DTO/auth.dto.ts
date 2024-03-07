import { ApiProperty } from '@nestjs/swagger';

export interface AuthDTO {
  email: string;
  password: string;
}

export class AuthDTOSchema implements AuthDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export interface AuthPayloadDTO {
  id: string;
}

export class AuthPayloadDTOSchema implements AuthPayloadDTO {
  @ApiProperty()
  id: string;
}
