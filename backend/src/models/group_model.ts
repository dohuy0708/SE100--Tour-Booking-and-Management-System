import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Group {
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  group_id!: string;

  @Column('varchar', { length: 50 })  
  group_name!: string;
}
