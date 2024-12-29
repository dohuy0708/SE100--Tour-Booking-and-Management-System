import { ITourPriceService } from '../services/interfaces/i-tour-price-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { TourPrice } from '../models/tourprice_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class TourPriceController {
  public common: IBaseCrudController<TourPrice>;
  private TourPriceService: ITourPriceService<TourPrice>;
  constructor(
    @inject('TourPriceService') TourPriceService: ITourPriceService<TourPrice>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.TourPriceService = TourPriceService;
    this.common = common;
  }
}
