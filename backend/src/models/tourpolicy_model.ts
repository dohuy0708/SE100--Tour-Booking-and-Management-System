import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './group_model';
import { Tour } from './tour_model';
import { BaseModel } from './base-model';

export enum PolicyType {
    Domestic = 'domestic',
    International = 'international',
  }

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM


export class TourPolicy extends BaseModel{
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  policy_id!: string;

  @Column({type:'enum', enum:PolicyType, default:PolicyType.Domestic })  
  policy_type!: PolicyType;

  @Column({type:'text'})  
  policy_content!: string;

  @OneToMany(()=>Tour, (tour)=> tour.policy_id)
  tours!:Tour[]
}
