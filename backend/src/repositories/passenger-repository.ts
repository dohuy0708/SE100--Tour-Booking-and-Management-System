import { IPassengerRepository } from './interfaces/i-passsenger-repository';
import { Passenger } from '../models/passenger_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class PassengerRepository extends BaseRepository<Passenger> implements IPassengerRepository<Passenger> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Passenger));
  }
}
