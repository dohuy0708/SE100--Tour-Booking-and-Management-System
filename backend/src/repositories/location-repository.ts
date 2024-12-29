import { Location } from '../models/location_model';
import { ILocationRepository } from './interfaces/i-location-repository';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class LocationRepository extends BaseRepository<Location> implements ILocationRepository<Location> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Location));
  }
}
