import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({ example: 'token', description: 'Bearer token' })
  token: string;

  @ApiProperty({ example: '1800', description: 'Время жизни токена' })
  expire: string;
}
