import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsDefined({ message: 'Отсутствует email' })
  @IsEmail({}, { message: 'Некорректный email' })
  @MaxLength(100, { message: 'Слишком длинный email' })
  readonly email: string;

  @ApiProperty({ example: 'TestPass007', description: 'Пароль' })
  @IsDefined({ message: 'Отсутствует пароль' })
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  @Matches(
    /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
      message:
        'Пароль должен содержать минимум одну цифру, одну заглавную и одну строчную буквы',
    },
  )
  @MaxLength(100, { message: 'Слишком длинный пароль' })
  readonly password: string;

  @ApiProperty({ example: 'Nickname007', description: 'Никнейм' })
  @IsDefined({ message: 'Отсутствует никнейм' })
  @IsNotEmpty({ message: 'Никнейм не может быть пустым' })
  @MaxLength(30, { message: 'Слишком длинный никнейм' })
  @Matches(/^[^0-9]\w+$/, {
    message: 'Никнейм может содержать только латинские буквы и цифры',
  })
  readonly nickname: string;
}
