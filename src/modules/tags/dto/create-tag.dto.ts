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
    example: 'Название',
    description: 'Название тега',
    required: false,
  })
  @IsOptional()
  @IsNumberString({}, { message: 'Число должно быть строкой' })
  @Type(() => Number)
  @IsInt({ message: 'Только целое число' })
  readonly sortOrder: number;
}
