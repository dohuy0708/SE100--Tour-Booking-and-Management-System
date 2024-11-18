import { ILocationService } from '../services/interfaces/i-location-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { Location } from '../models/location_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class LocationController {
  public common: IBaseCrudController<Location>;
  private LocationService: ILocationService<Location>;
  constructor(
    @inject('LocationService') LocationService: ILocationService<Location>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.LocationService = LocationService;
    this.common = common;
  }
}
