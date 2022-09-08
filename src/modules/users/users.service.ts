import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInUserDto } from './dto/sign-in-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from './users.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: SignInUserDto) {
    await this.validateUser(dto);

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersRepository.createUser(
      dto.email,
      hashPassword,
      dto.nickname,
    );

    return this.generateToken(user);
  }

  async login(dto: LoginUserDto) {
    const user = await this.usersRepository.getByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Некорректный email и/или пароль');
    }

    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException('Некорректный email и/или пароль');
    }

    return this.generateToken(user);
  }

  generateToken(user: User) {
    const payload = { email: user, uid: user.uid, nickname: user.nickname };

    return {
      token: this.jwtService.sign(payload, {
        expiresIn: '30m',
      }),
      expire: '1800',
    };
  }

  async update(uid: string, dto: UpdateUserDto) {
    if (!dto.email && !dto.nickname && !dto.password) {
      throw new BadRequestException([
        'email - Отсутствуют изменения',
        'password - Отсутствуют изменения',
        'nickname - Отсутствуют изменения',
      ]);
    }

    await this.validateUser(dto);
    const user = new User(uid, dto.email, dto.nickname);

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 5);
    }

    await this.usersRepository.updateUser(user);

    return {
      email: user.email,
      nickname: user.nickname,
    };
  }

  async remove(uid: string) {
    await this.usersRepository.removeUser(uid);
    return 'Пользователь успешно удален';
  }

  async getSelfWithTags(uid: string) {
    return await this.usersRepository.getUserWithTags(uid);
  }

  private async validateUser(dto: UpdateUserDto) {
    if (dto.email) {
      const candidateByEmail = await this.usersRepository.getByEmail(dto.email);
      if (candidateByEmail) {
        throw new ConflictException([
          'email - Пользователь с таким email уже существует',
        ]);
      }
    }

    if (dto.nickname) {
      const candidateByNickname = await this.usersRepository.getByNickname(
        dto.nickname,
      );
      if (candidateByNickname) {
        throw new ConflictException([
          'nickname - Пользователь с таким никнеймом уже существует',
        ]);
      }
    }
  }
}
