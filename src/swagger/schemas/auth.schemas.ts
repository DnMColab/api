import { ApiProperty } from '@nestjs/swagger';
import { AuthDTO, AuthPayloadDTO } from 'src/DTO/auth.dto';

export class AuthDTOSchema implements AuthDTO {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ minLength: 8, maxLength: 32 })
  password: string;
}

export class AuthPayloadDTOSchema implements AuthPayloadDTO {
  @ApiProperty({ format: 'cuid' })
  id: string;
}
