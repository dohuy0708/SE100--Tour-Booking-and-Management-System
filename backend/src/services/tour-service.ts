import { Tour } from '../models/tour_model';
import { ITourRepository } from '../repositories/interfaces/i-tour-repositoty';
import { BaseCrudService } from './base/Base-Service';
import { ITourService } from './interfaces/i-tour-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class TourService extends BaseCrudService<Tour> implements ITourService<Tour> {
  private TourRepository: ITourRepository<Tour>;
  constructor(@inject('TourRepository') TourRepository: ITourRepository<Tour>) {
    super(TourRepository);
    this.TourRepository = TourRepository;
  }
}
