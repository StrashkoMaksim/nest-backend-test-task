import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '../JWT/jwt-config.service';
import { UsersTagsController } from './users-tags/users-tags.controller';
import { UsersTagsService } from './users-tags/users-tags.service';
import { UsersTagsRepository } from './users-tags/users-tags.repository';

@Module({
  controllers: [TagsController, UsersTagsController],
  providers: [
    TagsService,
    TagsRepository,
    UsersTagsService,
    UsersTagsRepository,
  ],
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
})
export class TagsModule {}
