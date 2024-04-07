import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
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

  @Post('sample')
  async sample() {
    /**
     * create: 모델에 해당되는 객체 생성 - 저장은 안함
     */
    // const user1 = this.userRepository.create({
    //   email: 'test@codefactory.ai',
    // });

    /**
     * save: 저장
     */
    // const user2 = this.userRepository.save({
    //   email: 'test_user2@codefactory.ai',
    // });

    /**
     * preload:
     * - 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고,
     * - 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함.
     * - 저장X
     */
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'preload@preload.com',
    // });

    /**
     * delete: 삭제하기
     */
    // await this.userRepository.delete(103);

    /**
     * increment: 프로퍼티 값을 증가시키기
     * - 첫 번째 인자는 필터링
     * - 두 번째 인자는 증가시킬 프로퍼티
     * - 세 번째 인자는 증가시킬 값
     */
    // await this.userRepository.increment({ id: 1 }, 'count', 2);

    /**
     * decrement: 프로퍼티 값을 감소시키기
     */
    // await this.userRepository.decrement({ id: 1 }, 'count', 2);

    /**
     * count: 개수 카운팅
     */
    // const count = await this.userRepository.count({
    //   where: { email: ILike('%0%') },
    // });

    /**
     * sum: 총합 구하기
     * - 첫 번째 인자는 값을 더할 프로퍼티
     * - 두 번째 인자는 필터링
     */
    // const sum = await this.userRepository.sum('count', { email: ILike('%0%') });

    /**
     * average: 평균값 구하기
     * - 첫 번째 인자는 평균을 구할 프로퍼티
     * - 두 번째 인자는 필터링
     */
    // const average = await this.userRepository.average('count', {
    //   id: LessThanOrEqual(4),
    // });

    /**
     * minimum: 최소값 구하기
     */
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThanOrEqual(4),
    // });

    /**
     * maximum: 최대값 구하기
     */
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThanOrEqual(4),
    // });

    /**
     * findAndCount: 일치하는 결과를 가져오며 숫자와 함께 반환
     */
    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
    });

    return usersAndCount;
  }

  @Post('users')
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@kakao.com`,
      });
    }
    return true;
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      order: { id: 'ASC' },
      where: {
        /**
         * Not(): 아닌 경우 가져오기
         */
        // id: Not(1),
        /**
         * LessThan: 적은 것 가져오기 (미만)
         * LessThanOrEqual: 같거나 적은 것 가져오기 (이하)
         * MoreThan: 초과
         * MoreThanOrEqual: 이상
         * Equal: 같은 것
         */
        // id: LessThan(10),
        // id: LessThanOrEqual(10),
        // id: MoreThan(90),
        // id: MoreThanOrEqual(90),
        // id: Equal(30),
        /**
         * Like: 비슷한 것 찾기
         * - % 기호가 앞에 있으면 키워드 앞에 어떤 것이 와도 상관이 없다는 뜻
         * - 앞뒤로 있으면 키워드 앞뒤로 어떤 글자가 와도 상관이 없다는 뜻
         * ILike: Like과 같으나 대소문자 구분X
         */
        // email: Like('%0%'),
        // email: ILike('%KAKAO%'),
        /**
         * Between: 사잇값에 해당하는 것만
         * In: 배열 안에 해당하는 것만
         */
        // id: Between(10, 15),
        // id: In([1, 4, 6]),
        /**
         * IsNull: null인 것만
         */
        // id: IsNull(),
      },
      /**
       * select: 어떤 프로퍼티를 선택할지
       * - 기본은 모든 프로퍼티를 가져온다.
       * - 정의할 경우 정의한 프로퍼티만 가져온다.
       */
      // select: {
      //   id: true,
      //   createdAt: true,
      //   version: true,
      // 관계를 가져올 때도 어떤 프로퍼티만 가져올지 선택이 가능하다
      //   profile: {
      //     id: true,
      //   },
      // },
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
      // where: [{ id: 1 }, { version: 2 }, { profile: { id: 1 } }],
      /**
       * relation: 관계를 가져온다.
       */
      // relations: {
      //   profile: true,
      // },
      /**
       * order: 오름차 or 내림차순
       */
      // order: {
      //   id: 'ASC', // ID를 오름차순으로 정렬
      // },
      /**
       * skip: 처음 몇개를 제외할지
       * - default: 0
       */
      // skip: 0,
      /**
       * take: 몇개를 가져올지
       * - default: 0 (0이면 모두를 가져온다)
       * - 숫자를 지정할 경우 그 숫자만큼의 개수만 가져온다.
       */
      // take: 0,
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
