import { Payment } from '../models/payment_model';
import { IPaymentRepository } from '../repositories/interfaces/i-payment-repository';
import { BaseCrudService } from './base/Base-Service';
import { IPaymentService } from './interfaces/i-payment-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class PaymentService extends BaseCrudService<Payment> implements IPaymentService<Payment> {
  private PaymentRepository: IPaymentRepository<Payment>;
  constructor(@inject('PaymentRepository') PaymentRepository: IPaymentRepository<Payment>) {
    super(PaymentRepository);
    this.PaymentRepository = PaymentRepository;
  }
}
