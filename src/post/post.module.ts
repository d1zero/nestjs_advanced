import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from '../file/file.module';
import { User } from '../user/user.models';
import { PostController } from './post.controller';
import { Post } from './post.models';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
      SequelizeModule.forFeature([User, Post]),
      FileModule
  ]
})
export class PostModule {}
