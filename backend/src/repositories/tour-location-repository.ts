import { ITourLocationRepository } from './interfaces/i-tour-location-repository';
import { Tour_Location } from '../models/tour_location_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class TourLocationRepository extends BaseRepository<Tour_Location> implements ITourLocationRepository<Tour_Location> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Tour_Location));
  }
}
