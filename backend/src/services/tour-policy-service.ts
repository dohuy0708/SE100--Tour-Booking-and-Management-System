import { TourPolicy } from '../models/tourpolicy_model';
import { ITourPolicyRepository } from '../repositories/interfaces/i-tour-policy-repository';
import { BaseCrudService } from './base/Base-Service';
import { ITourPolicyService } from './interfaces/i-tour-policy-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class TourPolicyService extends BaseCrudService<TourPolicy> implements ITourPolicyService<TourPolicy> {
  private TourPolicyRepository: ITourPolicyRepository<TourPolicy>;
  constructor(@inject('TourPolicyRepository') TourPolicyRepository: ITourPolicyRepository<TourPolicy>) {
    super(TourPolicyRepository);
    this.TourPolicyRepository = TourPolicyRepository;
  }
}
