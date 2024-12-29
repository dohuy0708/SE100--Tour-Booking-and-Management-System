import { Group } from '../models/group_model';
import { IGroupRepository } from '../repositories/interfaces/i-group-repository';
import { BaseCrudService } from './base/Base-Service';
import { IGroupService } from './interfaces/i-group-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class GroupService extends BaseCrudService<Group> implements IGroupService<Group> {
  private GroupRepository: IGroupRepository<Group>;
  constructor(@inject('GroupRepository') GroupRepository: IGroupRepository<Group>) {
    super(GroupRepository);
    this.GroupRepository = GroupRepository;
  }
}
