import { DATE } from './../../node_modules/sequelize/types/data-types.d';
import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './group_model';
import { User } from './user_model';
import { Tour } from './tour_model';
import { BaseModel } from './base-model';




@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Feedback extends BaseModel {
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  feedback_id!: string;

  @ManyToOne(()=>User, (user)=>user.feedbacks)  
  customer_id!: User;

  @ManyToOne(()=>Tour, (tour)=>tour.feedbacks)  
  tour_id!: Tour;

  @Column({ type: 'text' })
  feedback_content!: string;

  @Column({ type:'date'})  
  feedback_date!: Date;

}
