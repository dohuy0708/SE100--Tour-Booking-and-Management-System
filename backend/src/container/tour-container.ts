import { TourController } from '../controllers/tour-controller';
import { TourService } from '../services/tour-service';
import { Tour } from '../models/tour_model';
import { TourRepository } from '../repositories/tour-repository';
import { ITourService } from '../services/interfaces/i-tour-service';
import { ITourRepository } from '../repositories/interfaces/i-tour-repositoty';
import { BaseContainer } from './base-container';

class TourContainer extends BaseContainer {
  constructor() {
    super(Tour);

    this.container.bind<ITourService<Tour>>('TourService').to(TourService);

    this.container.bind<ITourRepository<Tour>>('TourRepository').to(TourRepository);

    this.container.bind<TourController>(TourController).toSelf();
  }

  export() {
    const tourController = this.container.get<TourController>(TourController);
    const tourService = this.container.get<ITourService<Tour>>('TourService');
    return { tourController, tourService };
  }
}

const tourContainer = new TourContainer();
const { tourController, tourService } = tourContainer.export();
export { tourController, tourService };
