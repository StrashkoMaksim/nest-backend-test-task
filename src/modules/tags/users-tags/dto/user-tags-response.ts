import { ApiProperty } from '@nestjs/swagger';

export class UserTagsResponse {
  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'example',
        sortOrder: '0',
      },
      {
        id: 2,
        name: 'example',
        sortOrder: '0',
      },
      {
        id: 3,
        name: 'example',
        sortOrder: '0',
      },
    ],
    description: 'Список тегов, закрепленных за пользователем',
  })
  tags: any;
}
