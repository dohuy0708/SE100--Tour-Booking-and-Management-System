import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './group_model';
import { Tour } from './tour_model';
import { Tour_Location } from './tour_location_model';
import { BaseModel } from './base-model';

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class Location extends BaseModel {
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  location_id!: string;

  @Column('varchar', {length:100})  
  location_name!: string;

  @Column('varchar', {length:255})  
  address!: string;

  @OneToMany(() => Tour_Location, (tour_location) => tour_location.Location_id)
  tourLocations!: Tour_Location[];

}
