import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './group_model';
import { Role } from './role_model';
import { BaseModel } from './base-model';

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Group_Role extends BaseModel {
  @ManyToOne(()=>Group , (group)=>group.group_roles)
  group_id!: Group;

  @ManyToOne(()=>Role , (role)=>role.group_roles)
  role_id!: Role;
}
