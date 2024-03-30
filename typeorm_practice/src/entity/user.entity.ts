import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { PostModel } from './post.entity';
import { ProfileModel } from './proflie.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  /**
   * @PrimaryColumn
   * - 모든 테이블에서 기본적으로 존재해야 한다.
   * - 테이블 안에서 각각의 Row를 구분할 수 있는 컬럼이다. but 자동 생성은 안 된다.
   *
   * @PrimaryGeneratedColumn('uuid')
   * - 자동으로 Primary Column을 생성해주지만, uuid 로 생성해준다.
   */
  // 자동으로 ID를 생성한다.
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // @Column({
  //   type: 'varchar', // 데이터베이스에서 인지하는 컬럼 타입이며, 자동으로 유추됨
  //   name: 'title', // 데이터베이스 컬럼 이름
  //   nullable: true,
  //   update: true, // true면 처음 저장할 때만 값 지정 가능
  //   select: true, // find() 를 실행할 때 기본으로 값을 불러올지, default: true
  //   default: 'default title', // 아무갓도 입력하지 않았을 때 value
  //   unique: false, // 컬럼 중 유니크한 값이 돼야하는지 (회원가입시 이메일 등)
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힌다.
  @CreateDateColumn()
  createdAt: Date;

  // 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힌다.
  @UpdateDateColumn()
  updatedAt: Date;

  // 데이터가 업데이트될 때마다 1씩 올라간다. default: 1
  // save() 함수가 몇번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  // 컬럼인데 자동으로 업데이트해준다. (숫자 증가 또는 uuid 할당)
  @Column()
  @Generated('increment') // 'increment' | 'uuid' | 'rowId'
  additionalId: number;

  /**
   * NOTICE: 이 relations option 은 JoinColumn이 붙은 쪽에서만 유효하다!
   */
  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    /**
     * true일 경우 find() 시에 relations 를 하지 않아도 가져와준다
     * - default: false
     */
    eager: true,
    /**
     * true일 경우 저장할 때 relation을 한번에 같이 저장 가능
     * - default: false
     * - 가령 User 를 생성할 때 Profile 에 데이터를 넣는다고 Profile까지 같이 생성되지 않지만, true 일 경우 User 생성시에 Profile이 같이 생성된다.
     */
    cascade: true,
    /**
     * 모든 relations는 관계를 맺고 있는 반대쪽이 없을 수도 있다.
     * - default: true
     * - 생성과 동시에 relation이 nullable하지 않으려면 cascasde 를 true 로 놓고 써야 같이 의미가 있다.
     */
    nullable: true,
    /**
     * 관계가 삭제했을 때의 옵션
     * - no action: 아무것도 안 함
     * - cascade: 참조하는 Row도 같이 삭제
     * - set null: 참조하는 Row에서 참조 id 를 null로 변경
     * - set default: 테이블의 기본 세팅으로 설정
     * - restrict: 참조하고 있는 Row가 있는 경우 참조당하는 Row 삭제 불가
     */
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel;
}
