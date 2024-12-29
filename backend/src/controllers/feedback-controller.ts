import { IFeedbackService } from '../services/interfaces/i-feedback-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { Feedback } from '../models/feedback_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class FeedbackController {
  public common: IBaseCrudController<Feedback>;
  private FeedbackService: IFeedbackService<Feedback>;
  constructor(
    @inject('FeedbackService') FeedbackService: IFeedbackService<Feedback>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.FeedbackService = FeedbackService;
    this.common = common;
  }
}
