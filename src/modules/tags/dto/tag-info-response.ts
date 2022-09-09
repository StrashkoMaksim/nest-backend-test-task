import { CreatorInfo } from '../entities/tag.entity';
import { ApiProperty } from '@nestjs/swagger';

export class TagInfoResponse {
  @ApiProperty({
    example: {
      nickname: 'Nickname007',
      uid: 'uuid',
    },
    description: 'Информация о создателе',
  })
  creator: CreatorInfo;

  @ApiProperty({ example: '0', description: 'Порядок тега' })
  sortOrder: string;

  @ApiProperty({ example: 'Название', description: 'Название тега' })
  name: string;
}
