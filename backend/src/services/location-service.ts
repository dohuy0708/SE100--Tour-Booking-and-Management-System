import { Location } from '../models/location_model';
import { ILocationRepository } from '../repositories/interfaces/i-location-repository';
import { BaseCrudService } from './base/Base-Service';
import { ILocationService } from './interfaces/i-location-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class LocationService extends BaseCrudService<Location> implements ILocationService<Location> {
  private LocationRepository: ILocationRepository<Location>;
  constructor(@inject('LocationRepository') LocationRepository: ILocationRepository<Location>) {
    super(LocationRepository);
    this.LocationRepository = LocationRepository;
  }
}
