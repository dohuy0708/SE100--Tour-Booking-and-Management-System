import { ITourService } from '../services/interfaces/i-tour-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { Tour } from '../models/tour_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class TourController {
  public common: IBaseCrudController<Tour>;
  private TourService: ITourService<Tour>;
  constructor(
    @inject('TourService') TourService: ITourService<Tour>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.TourService = TourService;
    this.common = common;
  }
}
