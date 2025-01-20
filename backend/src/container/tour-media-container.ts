import { TourMediaController } from '../controllers/tour-media-controller';
import { TourMediaService } from '../services/tour-media-service';
import { TourMedia } from '../models/tourmedia_model';
import { TourMediaRepository } from '../repositories/tour-media-repository';
import { ITourMediaService } from '../services/interfaces/i-tour-media';
import { ITourMediaRepository } from '../repositories/interfaces/i-tour-media-repository';
import { BaseContainer } from './base-container';

class TourMediaContainer extends BaseContainer {
  constructor() {
    super(TourMedia);

    this.container.bind<ITourMediaService<TourMedia>>('TourMediaService').to(TourMediaService);

    this.container.bind<ITourMediaRepository<TourMedia>>('TourMediaRepository').to(TourMediaRepository);

    this.container.bind<TourMediaController>(TourMediaController).toSelf();
  }

  export() {
    const tourMediaController = this.container.get<TourMediaController>(TourMediaController);
    const tourMediaService = this.container.get<ITourMediaService<TourMedia>>('TourMediaService');
    return { tourMediaController, tourMediaService };
  }
}

const tourMediaContainer = new TourMediaContainer();
const { tourMediaController, tourMediaService } = tourMediaContainer.export();
export { tourMediaController, tourMediaService };
