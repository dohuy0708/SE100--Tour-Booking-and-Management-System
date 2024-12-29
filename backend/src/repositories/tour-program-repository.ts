import { ITourProgramRepository } from './interfaces/i-tour-program-repository';
import { TourProgram } from '../models/tourprogram_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class TourProgramRepository extends BaseRepository<TourProgram> implements ITourProgramRepository<TourProgram> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(TourProgram));
  }
}
