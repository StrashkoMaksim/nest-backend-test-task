import { OmitType } from '@nestjs/swagger';
import { SignInUserDto } from './sign-in-user.dto';

export class LoginUserDto extends OmitType(SignInUserDto, ['nickname']) {}
