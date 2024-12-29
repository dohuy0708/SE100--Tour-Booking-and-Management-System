import { Schedule } from '../models/schedule_model';
import { IScheduleRepository } from '../repositories/interfaces/i-schedule-repository';
import { BaseCrudService } from './base/Base-Service';
import { IScheduleService } from './interfaces/i-schedule-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class ScheduleService extends BaseCrudService<Schedule> implements IScheduleService<Schedule> {
  private ScheduleRepository: IScheduleRepository<Schedule>;
  constructor(@inject('ScheduleRepository') ScheduleRepository: IScheduleRepository<Schedule>) {
    super(ScheduleRepository);
    this.ScheduleRepository = ScheduleRepository;
  }
}
