import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagModel } from './tag.entity';
import { UserModel } from './user.entity';

@Entity()
export class PostModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserModel, (user) => user.posts)
  @JoinColumn()
  author: UserModel;

  @ManyToMany(() => TagModel, (tag) => tag.posts)
  @JoinTable() // N:N 관계일 경우 JoinColumn이 아닌 JoinTable을 사용해야 중간테이블이 생성된다.
  tags: TagModel[];

  @Column()
  title: string;
}
