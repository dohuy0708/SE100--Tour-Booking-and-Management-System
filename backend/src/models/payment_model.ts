import { DATE } from './../../node_modules/sequelize/types/data-types.d';
import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './group_model';
import { User } from './user_model';
import { Tour } from './tour_model';
import { Booking } from './booking_model';


enum PaymentMethod {
    credit_card = 'credit card',
    bank_transfer = 'bank transfer',
    Cash='cash'
  }


@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Payment {
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  payment_id!: string;

  @OneToMany(()=>Booking, (booking)=>booking.booking_id)  
  booking_id!: Booking;

  @Column({ type: 'decimal', precision:10, scale:2 })
  amount_paid!: string;

  @Column({ type:'date' })  
  payment_date!: Date;

  @Column({type:'enum', enum:PaymentMethod, default:'cash'})  
  payment_method!: PaymentMethod;


}
