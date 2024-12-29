import { TourPolicyController } from '../controllers/tour-policy-controller';
import { TourPolicyService } from '../services/tour-policy-service';
import { TourPolicy } from '../models/tourpolicy_model';
import { TourPolicyRepository } from '../repositories/tour-policy-repository';
import { ITourPolicyService } from '../services/interfaces/i-tour-policy-service';
import { ITourPolicyRepository } from '../repositories/interfaces/i-tour-policy-repository';
import { BaseContainer } from './base-container';

class TourPolicyContainer extends BaseContainer {
  constructor() {
    super(TourPolicy);

    this.container.bind<ITourPolicyService<TourPolicy>>('TourPolicyService').to(TourPolicyService);

    this.container.bind<ITourPolicyRepository<TourPolicy>>('TourPolicyRepository').to(TourPolicyRepository);

    this.container.bind<TourPolicyController>(TourPolicyController).toSelf();
  }

  export() {
    const tourPolicyController = this.container.get<TourPolicyController>(TourPolicyController);
    const tourPolicyService = this.container.get<ITourPolicyService<TourPolicy>>('TourPolicyService');
    return { tourPolicyController, tourPolicyService };
  }
}

const tourPolicyContainer = new TourPolicyContainer();
const { tourPolicyController, tourPolicyService } = tourPolicyContainer.export();
export { tourPolicyController, tourPolicyService };
