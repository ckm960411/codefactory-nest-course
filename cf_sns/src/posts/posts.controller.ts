import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsModel } from './entities/posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  // 모든 Post를 가져온다.
  @Get()
  async getPosts(): Promise<PostsModel[]> {
    return this.postsService.getAllPost();
  }

  // 2) GET /posts/:id
  // id에 해당되는 Post를 가져온다.
  @Get(':id')
  async getPost(@Param('id') id: string): Promise<PostsModel> {
    return this.postsService.getPostById(+id);
  }

  // 3) POST /posts
  // POST를 생성한다.
  @Post()
  async postPost(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<PostsModel> {
    return this.postsService.createPost(author, title, content);
  }

  // 4) PUT /posts/:id
  // id에 해당되는 post를 변경한다.
  @Put(':id')
  async putPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ): Promise<PostsModel> {
    return this.postsService.updatePost(+id, author, title, content);
  }

  // 5) DELETE /posts/:id
  // id에 해당되는 post를 삭제한다.
  @Delete(':id')
  deletePost(@Param('id') id: string): Promise<number> {
    return this.postsService.deletePost(+id);
  }
}
