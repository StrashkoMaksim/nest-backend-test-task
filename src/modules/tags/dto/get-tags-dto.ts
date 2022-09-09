import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class GetTagsDto {
  @ApiProperty({
    example: 'true',
    description: 'Сортировка по полю sortOrder',
    required: false,
  })
  @IsOptional()
  @Transform(() => true)
  readonly sortByOrder?: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Сортировка по полю имени',
    required: false,
  })
  @IsOptional()
  @Transform(() => true)
  readonly sortByName?: boolean;

  @ApiProperty({ example: 10, description: 'Отступ', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Отступ должен быть целым числом' })
  @Min(1, { message: 'Отступ должен быть положительным числом' })
  readonly offset?: number;

  @ApiProperty({ example: 10, description: 'Кол-во тегов', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Кол-во должно быть целым числом' })
  @Min(1, { message: 'Кол-во должно быть положительным числом' })
  readonly length?: number;
}
