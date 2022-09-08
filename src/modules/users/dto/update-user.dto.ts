import { PartialType } from '@nestjs/swagger';
import { SignInUserDto } from './sign-in-user.dto';

export class UpdateUserDto extends PartialType(SignInUserDto) {}
