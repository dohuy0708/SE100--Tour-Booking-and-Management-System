import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Role {
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  role_id!: string;

  @Column('varchar', { length: 255 })  
  role_description!: string;

  @Column('varchar', { length: 255 })  
  url!: string;

 
}
