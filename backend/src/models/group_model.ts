import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user_model';
import { Group_Role } from './group_role_model';
import { BaseModel } from './base-model';

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Group extends BaseModel{
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  group_id!: string;

  @Column('varchar', { length: 50 })  
  group_name!: string;

  @OneToMany(()=>User, (user)=> user.group_id)
  users!:User[];

  @OneToMany(()=>Group_Role, (group_role)=> group_role.group_id)
  group_roles!:Group_Role[];
  
}
