import { LocationController } from '../controllers/location-controller';
import { LocationService } from '../services/location-service';
import { Location } from '../models/location_model';
import { LocationRepository } from '../repositories/location-repository';
import { ILocationService } from '../services/interfaces/i-location-service';
import { ILocationRepository } from '../repositories/interfaces/i-location-repository';
import { BaseContainer } from './base-container';

class LocationContainer extends BaseContainer {
  constructor() {
    super(Location);

    this.container.bind<ILocationService<Location>>('LocationService').to(LocationService);

    this.container.bind<ILocationRepository<Location>>('LocationRepository').to(LocationRepository);

    this.container.bind<LocationController>(LocationController).toSelf();
  }

  export() {
    const locationController = this.container.get<LocationController>(LocationController);
    const locationService = this.container.get<ILocationService<Location>>('LocationService');
    return { locationController, locationService };
  }
}

const locationContainer = new LocationContainer();
const { locationController, locationService } = locationContainer.export();
export { locationController, locationService };
