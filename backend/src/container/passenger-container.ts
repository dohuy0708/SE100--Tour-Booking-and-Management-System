import { PassengerController } from '../controllers/passenger-controller';
import { PassengerService } from '../services/passenger-service';
import { Passenger } from '../models/passenger_model';
import { PassengerRepository } from '../repositories/passenger-repository';
import { IPassengerService } from '../services/interfaces/i-passenger-service';
import { IPassengerRepository } from '../repositories/interfaces/i-passsenger-repository';
import { BaseContainer } from './base-container';

class PassengerContainer extends BaseContainer {
  constructor() {
    super(Passenger);

    this.container.bind<IPassengerService<Passenger>>('PassengerService').to(PassengerService);

    this.container.bind<IPassengerRepository<Passenger>>('PassengerRepository').to(PassengerRepository);

    this.container.bind<PassengerController>(PassengerController).toSelf();
  }

  export() {
    const passengerController = this.container.get<PassengerController>(PassengerController);
    const passengerService = this.container.get<IPassengerService<Passenger>>('PassengerService');
    return { passengerController, passengerService };
  }
}

const passengerContainer = new PassengerContainer();
const { passengerController, passengerService } = passengerContainer.export();
export { passengerController, passengerService };
