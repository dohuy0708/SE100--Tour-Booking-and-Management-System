import { IScheduleService } from '../services/interfaces/i-schedule-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { Schedule } from '../models/schedule_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class ScheduleController {
  public common: IBaseCrudController<Schedule>;
  private ScheduleService: IScheduleService<Schedule>;
  constructor(
    @inject('ScheduleService') ScheduleService: IScheduleService<Schedule>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.ScheduleService = ScheduleService;
    this.common = common;
  }
}
