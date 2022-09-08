import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagsRepository],
  imports: [DatabaseModule],
})
export class TagsModule {}
