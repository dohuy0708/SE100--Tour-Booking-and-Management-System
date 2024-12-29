import { IBookingService } from './../services/interfaces/i-booking-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { Booking } from '../models/booking_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class BookingController {
  public common: IBaseCrudController<Booking>;
  private BookingService: IBookingService<Booking>;
  constructor(
    @inject('BookingService') BookingService: IBookingService<Booking>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.BookingService = BookingService;
    this.common = common;
  }
}
