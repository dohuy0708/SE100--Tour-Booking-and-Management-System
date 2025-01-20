import { ITourLocationService } from '../services/interfaces/i-tour-location-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { Tour_Location } from '../models/tour_location_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class TourLocationController {
  public common: IBaseCrudController<Tour_Location>;
  private TourLocationService: ITourLocationService<Tour_Location>;
  constructor(
    @inject('TourLocationService') TourLocationService: ITourLocationService<Tour_Location>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.TourLocationService = TourLocationService;
    this.common = common;
  }
}
