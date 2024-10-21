import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Decimal128, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TourPolicy } from './tourpolicy_model';



enum TourType {
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

  @OneToMany(()=>TourPolicy, (policy)=>policy.policy_id, {onDelete: 'CASCADE'})
  policy_id!: TourPolicy;

}
