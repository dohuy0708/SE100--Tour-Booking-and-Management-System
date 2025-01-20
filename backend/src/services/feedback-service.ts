import { Feedback } from '../models/feedback_model';
import { IFeedBackRepository } from '../repositories/interfaces/i-feedback-repository';
import { BaseCrudService } from './base/Base-Service';
import { IFeedbackService } from './interfaces/i-feedback-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class FeedbackService extends BaseCrudService<Feedback> implements IFeedbackService<Feedback> {
  private FeedbackRepository: IFeedBackRepository<Feedback>;
  constructor(@inject('FeedbackRepository') FeedbackRepository: IFeedBackRepository<Feedback>) {
    super(FeedbackRepository);
    this.FeedbackRepository = FeedbackRepository;
  }
}
