import { IPassengerService } from '../services/interfaces/i-passenger-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { Passenger } from '../models/passenger_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class PassengerController {
  public common: IBaseCrudController<Passenger>;
  private PassengerService: IPassengerService<Passenger>;
  constructor(
    @inject('PassengerService') PassengerService: IPassengerService<Passenger>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.PassengerService = PassengerService;
    this.common = common;
  }
}
