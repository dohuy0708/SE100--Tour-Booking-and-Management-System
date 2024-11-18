import { ITourPolicyRepository } from './interfaces/i-tour-policy-repository';
import { TourPolicy } from '../models/tourpolicy_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class TourPolicyRepository extends BaseRepository<TourPolicy> implements ITourPolicyRepository<TourPolicy> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(TourPolicy));
  }
}
