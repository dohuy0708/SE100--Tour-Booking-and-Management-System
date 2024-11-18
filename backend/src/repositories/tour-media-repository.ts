import { ITourMediaRepository } from './interfaces/i-tour-media-repository';
import { TourMedia } from '../models/tourmedia_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class TourMediaRepository extends BaseRepository<TourMedia> implements ITourMediaRepository<TourMedia> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(TourMedia));
  }
}
