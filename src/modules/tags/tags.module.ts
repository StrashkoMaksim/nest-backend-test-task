import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '../JWT/jwt-config.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagsRepository],
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
})
export class TagsModule {}
