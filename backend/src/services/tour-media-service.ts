import { TourMedia } from '../models/tourmedia_model';
import { ITourMediaRepository } from '../repositories/interfaces/i-tour-media-repository';
import { BaseCrudService } from './base/Base-Service';
import { ITourMediaService } from './interfaces/i-tour-media';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class TourMediaService extends BaseCrudService<TourMedia> implements ITourMediaService<TourMedia> {
  private TourMediaRepository: ITourMediaRepository<TourMedia>;
  constructor(@inject('TourMediaRepository') TourMediaRepository: ITourMediaRepository<TourMedia>) {
    super(TourMediaRepository);
    this.TourMediaRepository = TourMediaRepository;
  }
}
