import { IsDefined, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddTagsDto {
  @ApiProperty({ example: [1, 2], description: 'Список ID тегов' })
  @IsDefined({ message: 'Отсутствует список ID тегов' })
  @IsInt({ each: true, message: 'ID тегов должны быть целыми числами' })
  @Min(1, { each: true, message: 'Только положительные числа' })
  readonly tags: number[];
}
