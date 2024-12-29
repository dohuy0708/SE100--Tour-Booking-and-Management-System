import { ITourPolicyService } from '../services/interfaces/i-tour-policy-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { TourPolicy } from '../models/tourpolicy_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class TourPolicyController {
  public common: IBaseCrudController<TourPolicy>;
  private TourPolicyService: ITourPolicyService<TourPolicy>;
  constructor(
    @inject('TourPolicyService') TourPolicyService: ITourPolicyService<TourPolicy>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.TourPolicyService = TourPolicyService;
    this.common = common;
  }
}
