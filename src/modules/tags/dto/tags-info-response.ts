import { ApiProperty } from '@nestjs/swagger';

export class TagsInfoResponse {
  @ApiProperty({
    example: [
      {
        creator: {
          nickname: 'example',
          uid: 'exam-pl-eUID',
        },
        name: 'example',
        sortOrder: '0',
      },
      {
        creator: {
          nickname: 'example',
          uid: 'exam-pl-eUID',
        },
        name: 'example',
        sortOrder: '0',
      },
    ],
    description: 'Список тегов',
  })
  data: TagsInfoResponse[];

  @ApiProperty({
    example: {
      offset: 10,
      length: 10,
      quantity: 100,
    },
    description: 'Информация о выборке',
  })
  meta: any;
}
