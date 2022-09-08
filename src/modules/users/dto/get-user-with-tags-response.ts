import { CreateTagResponse } from '../../tags/dto/create-tag-response';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserWithTagsResponse {
  @ApiProperty({ example: 'test@mail.ru', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'Nickname1', description: 'Никнейм пользователя' })
  nickname: string;

  @ApiProperty({
    example: [
      {
        id: 'id',
        name: 'example',
        sortOrder: '0',
      },
    ],
    description: 'Теги закрепленные за пользователем',
  })
  tags: CreateTagResponse[];
}
