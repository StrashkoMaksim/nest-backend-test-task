import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '../JWT/jwt-config.service';
import { UsersRepository } from './users.repository';
import { TagsModule } from '../tags/tags.module';
import { UsersTagsRepository } from '../tags/users-tags/users-tags.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersTagsRepository],
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    TagsModule,
  ],
})
export class UsersModule {}
