import { TourPriceController } from '../controllers/tour-price-controller';
import { TourPriceService } from '../services/tour-price-service';
import { TourPrice } from '../models/tourprice_model';
import { TourPriceRepository } from '../repositories/tour-price-repository';
import { ITourPriceService } from '../services/interfaces/i-tour-price-service';
import { ITourPriceRepository } from '../repositories/interfaces/i-tour-price-repository';
import { BaseContainer } from './base-container';

class TourPriceContainer extends BaseContainer {
  constructor() {
    super(TourPrice);

    this.container.bind<ITourPriceService<TourPrice>>('TourPriceService').to(TourPriceService);

    this.container.bind<ITourPriceRepository<TourPrice>>('TourPriceRepository').to(TourPriceRepository);

    this.container.bind<TourPriceController>(TourPriceController).toSelf();
  }

  export() {
    const tourPriceController = this.container.get<TourPriceController>(TourPriceController);
    const tourPriceService = this.container.get<ITourPriceService<TourPrice>>('TourPriceService');
    return { tourPriceController, tourPriceService };
  }
}

const tourPriceContainer = new TourPriceContainer();
const { tourPriceController, tourPriceService } = tourPriceContainer.export();
export { tourPriceController, tourPriceService };
