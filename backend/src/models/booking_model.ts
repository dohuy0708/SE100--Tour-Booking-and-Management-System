import { DATE } from './../../node_modules/sequelize/types/data-types.d';
import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './group_model';
import { User } from './user_model';
import { Tour } from './tour_model';


enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled'
  }

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Booking {
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  booking_id!: string;

  @OneToMany(()=>User, (user)=>user.user_id)  
  customer_id!: User;

  @ManyToOne(()=>Tour, (tour)=>tour.tour_id)  
  tour_id!: Tour;

  @Column({ type: 'date' })
  booking_date!: string;

  @Column({ type:'decimal', precision:10, scale:2 })  
  total_price!: string;

  @Column({type:'enum', enum:BookingStatus, default:'pending'})  
  booking_status!: BookingStatus;


}
