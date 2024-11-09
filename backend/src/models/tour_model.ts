import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Decimal128, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TourPolicy } from './tourpolicy_model';
import { TourMedia } from './tourmedia_model';
import { TourPrice } from './tourprice_model';
import { TourProgram } from './tourprogram_model';
import { Tour_Location } from './tour_location_model';
import { Schedule } from './schedule_model';
import { Booking } from './booking_model';
import { Feedback } from './feedback_model';



export enum TourType {
    Domestic = 'domestic',
    International = 'international',
  }
@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Tour {
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  tour_id!: string;

  @Column('varchar', { length: 100 })  
  tour_name!: string;

  @Column({type:'decimal',precision:18, scale:2 })  
  duration!: string;

  @Column( {type:'enum', enum:TourType, default:'Domestic'})  
  tour_type!: TourType;

  @ManyToOne(()=>TourPolicy, (policy)=>policy.tours, {onDelete: 'CASCADE'})
  policy_id!: TourPolicy;

  @OneToMany(()=>TourMedia, (tour_media)=>tour_media.tour_id)
  media!: TourMedia[];

  @OneToMany(() => TourPrice, (tour_price) => tour_price.tour_id)
  prices!: TourPrice[];
  
  @OneToMany(() => TourProgram, (tour_program) => tour_program.tour_id)
  programs!: TourProgram[];

  @OneToMany(() => Tour_Location, (tour_location) => tour_location.tour_id)
  tourLocations!: Tour_Location[];

  @OneToMany(() => Schedule, (schedule) => schedule.tour_id)
  schedules!: Schedule[];

  @OneToMany(()=> Booking, (booking)=>booking.tour_id)
  bookings!:Booking[];

  @OneToMany(()=> Feedback, (feedback)=>feedback.tour_id)
  feedbacks!:Feedback[];

}
