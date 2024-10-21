import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './group_model';
import { Role } from './role_model';

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Group_Role {
  @OneToMany(()=>Group , (group)=>group.group_id)
  group_id!: Group;

  @OneToMany(()=>Role , (role)=>role.role_id)
  role_id!: Role;
}
