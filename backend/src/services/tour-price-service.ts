import { TourPrice } from '../models/tourprice_model';
import { ITourPriceRepository } from '../repositories/interfaces/i-tour-price-repository';
import { BaseCrudService } from './base/Base-Service';
import { ITourPriceService } from './interfaces/i-tour-price-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class TourPriceService extends BaseCrudService<TourPrice> implements ITourPriceService<TourPrice> {
  private TourPriceRepository: ITourPriceRepository<TourPrice>;
  constructor(@inject('TourPriceRepository') TourPriceRepository: ITourPriceRepository<TourPrice>) {
    super(TourPriceRepository);
    this.TourPriceRepository = TourPriceRepository;
  }
}
