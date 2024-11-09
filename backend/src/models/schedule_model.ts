import { DATE } from './../../node_modules/sequelize/types/data-types.d';
import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './group_model';
import { User } from './user_model';
import { Tour } from './tour_model';
import { Booking } from './booking_model';
import { BaseModel } from './base-model';




@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Schedule extends BaseModel{
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  schedule_id!: string;

  @ManyToOne(()=>Tour, (tour)=>tour.schedules)  
  tour_id!: Tour;

  @Column({ type: 'date' })
  departure_date!: string;

  @Column({ type: 'time' })
  departure_time!: string;

  @Column('int')  
  capacity!: number;

  @Column('int')  
  available_slots!: number;

  @OneToMany(()=> Booking, (booking)=>booking.schedule_id)
  bookings!:Booking[];
}
