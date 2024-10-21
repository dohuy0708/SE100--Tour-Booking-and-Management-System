import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Tour } from './tour_model';
import { Location } from './location_model';

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Tour_Location {
  @OneToMany(()=>Tour, (tour)=>tour.tour_id)  
  tour_id!: string;

  @OneToMany(()=>Location, (location)=> location.location_id)  
  Location_id!: string;

 
}
