import { group } from 'console';
import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group_Role } from './group_role_model';

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Role {
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  role_id!: string;

  @Column('varchar', { length: 255 })  
  role_description!: string;

  @Column('varchar', { length: 255 })  
  url!: string;

  @OneToMany(()=> Group_Role, (group_role)=>group_role.role_id)
  group_roles!:Group_Role[];

}
