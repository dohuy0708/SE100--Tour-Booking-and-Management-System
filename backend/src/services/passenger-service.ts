import { IPassengerService } from './interfaces/i-passenger-service';
import { Passenger } from '../models/passenger_model';
import { IPassengerRepository } from '../repositories/interfaces/i-passsenger-repository';
import { BaseCrudService } from './base/Base-Service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class PassengerService extends BaseCrudService<Passenger> implements IPassengerService<Passenger> {
  private PassengerRepository: IPassengerRepository<Passenger>;
  constructor(@inject('PassengerRepository') PassengerRepository: IPassengerRepository<Passenger>) {
    super(PassengerRepository);
    this.PassengerRepository = PassengerRepository;
  }
}
