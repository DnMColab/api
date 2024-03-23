import { ApiProperty } from '@nestjs/swagger';
import { AuthDTO, AuthPayloadDTO } from 'src/DTO/auth.dto';

export class AuthDTOSchema implements AuthDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class AuthPayloadDTOSchema implements AuthPayloadDTO {
  @ApiProperty()
  id: string;
}
