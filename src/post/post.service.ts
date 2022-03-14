import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileService } from '../file/file.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.models';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post) private postRepository: typeof Post,
        private fileService: FileService) { }

    async create(dto: CreatePostDto, image: any) {
        const fileName = await this.fileService.createFile(image)
        const post = await this.postRepository.create({ ...dto, image: fileName })
        return post
    }
}
