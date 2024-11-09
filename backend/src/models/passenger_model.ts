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
export class Passenger extends BaseModel{
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  passenger_id!: string;

  @ManyToOne(()=>Booking, (booking)=>booking.passengers, {onDelete:'CASCADE'})  
  booking_id!: Booking;

  @Column('varchar', {length:100})
  full_name!: string;

  @Column('varchar', {length:20})
  passport_number!: string;

  @Column('date')  
  dob!: Date;
}
