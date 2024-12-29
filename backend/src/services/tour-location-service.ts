import { Tour_Location } from '../models/tour_location_model';
import { ITourLocationRepository } from '../repositories/interfaces/i-tour-location-repository';
import { BaseCrudService } from './base/Base-Service';
import { ITourLocationService } from './interfaces/i-tour-location-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class TourLocationService extends BaseCrudService<Tour_Location> implements ITourLocationService<Tour_Location> {
  private TourLocationRepository: ITourLocationRepository<Tour_Location>;
  constructor(@inject('TourLocationRepository') TourLocationRepository: ITourLocationRepository<Tour_Location>) {
    super(TourLocationRepository);
    this.TourLocationRepository = TourLocationRepository;
  }
}
