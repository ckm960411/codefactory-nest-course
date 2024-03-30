import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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

  @Column({
    type: 'varchar', // 데이터베이스에서 인지하는 컬럼 타입이며, 자동으로 유추됨
    name: 'title', // 데이터베이스 컬럼 이름
    nullable: true,
    update: true, // true면 처음 저장할 때만 값 지정 가능
    select: false, // find() 를 실행할 때 기본으로 값을 불러올지, default: true
    default: 'default title', // 아무갓도 입력하지 않았을 때 value
    unique: false, // 컬럼 중 유니크한 값이 돼야하는지 (회원가입시 이메일 등)
  })
  title: string;

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
}
