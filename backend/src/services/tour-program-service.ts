import { ITourProgramRepository } from './../repositories/interfaces/i-tour-program-repository';
import { TourProgram } from '../models/tourprogram_model';
import { BaseCrudService } from './base/Base-Service';
import { ITourProgramService } from './interfaces/i-tour-program';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class TourProgramService extends BaseCrudService<TourProgram> implements ITourProgramService<TourProgram> {
  private TourProgramRepository: ITourProgramRepository<TourProgram>;
  constructor(@inject('TourProgramRepository') TourProgramRepository: ITourProgramRepository<TourProgram>) {
    super(TourProgramRepository);
    this.TourProgramRepository = TourProgramRepository;
  }
}
