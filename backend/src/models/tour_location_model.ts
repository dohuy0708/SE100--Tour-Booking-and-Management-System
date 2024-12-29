import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Tour } from './tour_model';
import { Location } from './location_model';
import { BaseModel } from './base-model';

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Tour_Location extends BaseModel {
  @ManyToOne(()=>Tour, (tour)=>tour.tourLocations)  
  tour_id!: Tour;

  @OneToMany(()=>Location, (location)=> location.tourLocations)  
  Location_id!: Location;

 
}
