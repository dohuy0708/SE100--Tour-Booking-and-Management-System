import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './group_model';
import { group } from 'console';

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class User {
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  user_id!: string;

  @Column('varchar', { length: 100 })  
  user_name!: string;

  @Column('varchar', { length: 100 })  
  user_password!: string;

  @Column('varchar', { length: 100 })  
  email!: string;

  @Column('varchar', { length: 15 })  
  phone_number!: string;

  @Column('date')  
  date_of_birth!: Date;

  @ManyToOne(()=> Group, (group)=>group.group_id)  
  group_id!: Group;
}
