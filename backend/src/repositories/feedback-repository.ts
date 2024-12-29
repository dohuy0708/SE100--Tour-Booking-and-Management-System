import { IFeedBackRepository } from './interfaces/i-feedback-repository';
import { Feedback } from '../models/feedback_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class FeedbackRepository extends BaseRepository<Feedback> implements IFeedBackRepository<Feedback> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Feedback));
  }
}
