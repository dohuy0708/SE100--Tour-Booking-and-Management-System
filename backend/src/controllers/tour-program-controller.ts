import { ITourProgramService } from '../services/interfaces/i-tour-program';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { TourProgram } from '../models/tourprogram_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class TourProgramController {
  public common: IBaseCrudController<TourProgram>;
  private TourProgramService: ITourProgramService<TourProgram>;
  constructor(
    @inject('TourProgramService') TourProgramService: ITourProgramService<TourProgram>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.TourProgramService = TourProgramService;
    this.common = common;
  }
}
