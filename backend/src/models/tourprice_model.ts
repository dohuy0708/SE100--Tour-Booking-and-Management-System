import { injectable } from 'inversify';    // Dependency Injection nếu bạn dùng inversify
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Group } from './group_model';
import { Tour } from './tour_model';

@injectable()  // Sử dụng DI của inversify nếu bạn dùng DI
@Entity()      // Đánh dấu class này là một entity trong TypeORM
export class TourPrice {
  @PrimaryGeneratedColumn('uuid')  // Tự động tạo cột ID kiểu UUID
  price_id!: string;

  @Column({type:'decimal', precision:10, scale:2})  
  adult_price!: string;

  @Column({type:'decimal', precision:10, scale:2})  
  child_price!: string;

  @Column({type:'decimal', precision:10, scale:2})  
  infant_price!: string;

  @ManyToOne(() => Tour, (tour) => tour.prices, { onDelete: 'CASCADE' })
  tour_id!: Tour;

}
