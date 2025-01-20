import { ITourPriceRepository } from './interfaces/i-tour-price-repository';
import { TourPrice } from '../models/tourprice_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class TourPriceRepository extends BaseRepository<TourPrice> implements ITourPriceRepository<TourPrice> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(TourPrice));
  }
}
