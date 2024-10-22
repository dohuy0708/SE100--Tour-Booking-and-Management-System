import { Schedule } from './schedule_model';
import { DATE } from './../../node_modules/sequelize/types/data-types.d';
import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './group_model';
import { User } from './user_model';
import { Tour } from './tour_model';
import { Passenger } from './passenger_model';
import { Payment } from './payment_model';
import { scheduler } from 'timers/promises';


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

  @ManyToOne(()=>User, (user)=>user.bookings)  
  customer_id!: User;

  @ManyToOne(()=>Tour, (tour)=>tour.bookings)  
  tour_id!: Tour;

  @Column({ type: 'date' })
  booking_date!: string;

  @Column({ type:'decimal', precision:10, scale:2 })  
  total_price!: string;

  @Column({type:'enum', enum:BookingStatus, default:'pending'})  
  booking_status!: BookingStatus;

  @OneToMany(() => Passenger, (passenger) => passenger.booking_id)
  passengers!: Passenger[];

  @OneToMany(() => Payment, (payment) => payment.booking_id)
  payments!: Payment[];

  @ManyToOne(()=>Schedule, (schedule)=>schedule.bookings)
  schedule_id!:Schedule;
}
