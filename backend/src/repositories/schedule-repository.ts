import { IScheduleRepository } from './interfaces/i-schedule-repository';
import { Schedule } from '../models/schedule_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class ScheduleRepository extends BaseRepository<Schedule> implements IScheduleRepository<Schedule> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Schedule));
  }
}
