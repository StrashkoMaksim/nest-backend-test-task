import { ApiProperty } from '@nestjs/swagger';

export class CreateTagResponse {
  @ApiProperty({ example: '1', description: 'ID тега' })
  id: string;

  @ApiProperty({ example: 'Название', description: 'Название тега' })
  name: string;

  @ApiProperty({ example: '0', description: 'Порядок тега' })
  sortOrder: string;
}
