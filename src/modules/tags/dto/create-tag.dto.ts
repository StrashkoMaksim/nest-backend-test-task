import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ example: 'Название', description: 'Название тега' })
  @IsDefined({ message: 'Название отсутствует' })
  @IsNotEmpty({ message: 'Название не может быть пустой строкой' })
  @MaxLength(40, { message: 'Название слишком длинное' })
  readonly name: string;

  @ApiProperty({
    example: '0',
    description: 'Порядок тега',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Только целое число' })
  readonly sortOrder: number;
}
