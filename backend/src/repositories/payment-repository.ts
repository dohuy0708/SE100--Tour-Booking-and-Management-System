import { IPaymentRepository } from './interfaces/i-payment-repository';
import { Payment } from '../models/payment_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class PaymentRepository extends BaseRepository<Payment> implements IPaymentRepository<Payment> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Payment));
  }
}
