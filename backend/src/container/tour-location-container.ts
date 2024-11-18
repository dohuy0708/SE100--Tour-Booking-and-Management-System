import { TourLocationController } from '../controllers/tour-location-controller';
import { TourLocationService } from '../services/tour-location-service';
import { Tour_Location } from '../models/tour_location_model';
import { TourLocationRepository } from '../repositories/tour-location-repository';
import { ITourLocationService } from '../services/interfaces/i-tour-location-service';
import { ITourLocationRepository } from '../repositories/interfaces/i-tour-location-repository';
import { BaseContainer } from './base-container';

class TourLocationContainer extends BaseContainer {
  constructor() {
    super(Tour_Location);

    this.container.bind<ITourLocationService<Tour_Location>>('TourLocationService').to(TourLocationService);

    this.container.bind<ITourLocationRepository<Tour_Location>>('TourLocationRepository').to(TourLocationRepository);

    this.container.bind<TourLocationController>(TourLocationController).toSelf();
  }

  export() {
    const tourLocationController = this.container.get<TourLocationController>(TourLocationController);
    const tourLocationService = this.container.get<ITourLocationService<Tour_Location>>('TourLocationService');
    return { tourLocationController, tourLocationService };
  }
}

const tourLocationContainer = new TourLocationContainer();
const { tourLocationController, tourLocationService } = tourLocationContainer.export();
export { tourLocationController, tourLocationService };
