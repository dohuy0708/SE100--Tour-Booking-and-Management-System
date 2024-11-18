import { TourProgramController } from '../controllers/tour-program-controller';
import { TourProgramService } from '../services/tour-program-service';
import { TourProgram } from '../models/tourprogram_model';
import { TourProgramRepository } from '../repositories/tour-program-repository';
import { ITourProgramService } from '../services/interfaces/i-tour-program';
import { ITourProgramRepository } from '../repositories/interfaces/i-tour-program-repository';
import { BaseContainer } from './base-container';

class TourProgramContainer extends BaseContainer {
  constructor() {
    super(TourProgram);

    this.container.bind<ITourProgramService<TourProgram>>('TourProgramService').to(TourProgramService);

    this.container.bind<ITourProgramRepository<TourProgram>>('TourProgramRepository').to(TourProgramRepository);

    this.container.bind<TourProgramController>(TourProgramController).toSelf();
  }

  export() {
    const tourProgramController = this.container.get<TourProgramController>(TourProgramController);
    const tourProgramService = this.container.get<ITourProgramService<TourProgram>>('TourProgramService');
    return { tourProgramController, tourProgramService };
  }
}

const tourProgramContainer = new TourProgramContainer();
const { tourProgramController, tourProgramService } = tourProgramContainer.export();
export { tourProgramController, tourProgramService };
