import { ITourMediaService } from '../services/interfaces/i-tour-media';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { TourMedia } from '../models/tourmedia_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class TourMediaController {
  public common: IBaseCrudController<TourMedia>;
  private TourMediaService: ITourMediaService<TourMedia>;
  constructor(
    @inject('TourMediaService') TourMediaService: ITourMediaService<TourMedia>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.TourMediaService = TourMediaService;
    this.common = common;
  }
}
