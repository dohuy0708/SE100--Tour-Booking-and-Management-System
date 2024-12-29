import { ITourRepository } from './interfaces/i-tour-repositoty';
import { Tour } from '../models/tour_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class TourRepository extends BaseRepository<Tour> implements ITourRepository<Tour> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Tour));
  }
}
