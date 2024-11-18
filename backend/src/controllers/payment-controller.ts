import { IPaymentService } from '../services/interfaces/i-payment-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { Payment } from '../models/payment_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class PaymentController {
  public common: IBaseCrudController<Payment>;
  private PaymentService: IPaymentService<Payment>;
  constructor(
    @inject('PaymentService') PaymentService: IPaymentService<Payment>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.PaymentService = PaymentService;
    this.common = common;
  }
}
