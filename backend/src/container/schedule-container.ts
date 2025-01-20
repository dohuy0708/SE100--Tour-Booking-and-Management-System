import { ScheduleController } from '../controllers/schedule-controller';
import { ScheduleService } from '../services/schedule-service';
import { Schedule } from '../models/schedule_model';
import { ScheduleRepository } from '../repositories/schedule-repository';
import { IScheduleService } from '../services/interfaces/i-schedule-service';
import { IScheduleRepository } from '../repositories/interfaces/i-schedule-repository';
import { BaseContainer } from './base-container';

class ScheduleContainer extends BaseContainer {
  constructor() {
    super(Schedule);

    this.container.bind<IScheduleService<Schedule>>('ScheduleService').to(ScheduleService);

    this.container.bind<IScheduleRepository<Schedule>>('ScheduleRepository').to(ScheduleRepository);

    this.container.bind<ScheduleController>(ScheduleController).toSelf();
  }

  export() {
    const scheduleController = this.container.get<ScheduleController>(ScheduleController);
    const scheduleService = this.container.get<IScheduleService<Schedule>>('ScheduleService');
    return { scheduleController, scheduleService };
  }
}

const scheduleContainer = new ScheduleContainer();
const { scheduleController, scheduleService } = scheduleContainer.export();
export { scheduleController, scheduleService };
