import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column } from 'typeorm';

export class BaseModel {
  @Column('uuid', { nullable: true })
  id?: string;

  @CreateDateColumn()  
  createdAt?: Date;

  @UpdateDateColumn()  
  updatedAt?: Date;

  @Column('varchar', { nullable: true })  
  createdBy?: string;

  @Column('varchar', { nullable: true })  
  updatedBy?: string;

  @DeleteDateColumn()  
  deletedAt?: Date;
}
