import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserResponse {
  @ApiProperty({ example: 'test@mail.ru', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'NickName007', description: 'Никнейм' })
  nickname: string;
}
