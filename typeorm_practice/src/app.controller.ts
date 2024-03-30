import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from './entity/post.entity';
import { ProfileModel } from './entity/proflie.entity';
import { TagModel } from './entity/tag.entity';
import { UserModel } from './entity/user.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  postUser() {
    // return this.userRepository.save({ title: 'test title' });
    return [];
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      /**
       * select: 어떤 프로퍼티를 선택할지
       * - 기본은 모든 프로퍼티를 가져온다.
       * - 정의할 경우 정의한 프로퍼티만 가져온다.
       */
      select: {
        id: true,
        createdAt: true,
        version: true,
        // 관계를 가져올 때도 어떤 프로퍼티만 가져올지 선택이 가능하다
        profile: {
          id: true,
        },
      },
      /**
       * where: 필터링할 조건을 입력하게 된다.
       * - 기본적으론 교집합(AND)으로 동작
       * - 합집합(OR)으로 넣고 싶은 경우 배열로 넣는다.
       * - 관계로도 필터링할 수 있다.
       */
      // where: {
      //   id: 1,
      //   version: 2,
      // },
      where: [{ id: 1 }, { version: 2 }, { profile: { id: 1 } }],
      /**
       * relation: 관계를 가져온다.
       */
      relations: {
        profile: true,
      },
      /**
       * order: 오름차 or 내림차순
       */
      order: {
        id: 'ASC', // ID를 오름차순으로 정렬
      },
      /**
       * skip: 처음 몇개를 제외할지
       * - default: 0
       */
      skip: 0,
      /**
       * take: 몇개를 가져올지
       * - default: 0 (0이면 모두를 가져온다)
       * - 숫자를 지정할 경우 그 숫자만큼의 개수만 가져온다.
       */
      take: 0,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });

    return this.userRepository.save({
      ...user,
    });
  }

  @Post('user/profile')
  async createUserAndProfile() {
    /**
     * default: cascase가 false 라면 각각 따로 생성해준다.
     */
    // const user = await this.userRepository.save({
    //   email: 'asdf@codefactory.ai',
    // });
    //
    // const profile = await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user,
    // });

    /**
     * cascasde true인 경우 User 를 생성할 때 한번에 Profile을 생성할 수 있다.
     */
    const user = await this.userRepository.save({
      email: 'asdf@codefactory.ai',
      profile: {
        profileImg: 'asdf.jpg',
      },
    });

    return user;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postuesr@codefactory.ai',
    });

    await this.postRepository.save({ title: 'post 1', author: user });
    await this.postRepository.save({ title: 'post 2', author: user });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: number) {
    await this.profileRepository.delete(+id);
    return true;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });
    const post2 = await this.postRepository.save({
      title: 'Programming',
    });

    const tag1 = await this.tagRepository.save({
      name: 'JavaScript',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'TypeScript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS is not NestJS',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
