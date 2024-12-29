import { Group_Role } from '../models/group_role_model';
import { IGroupRoleRepository } from '../repositories/interfaces/i-group-role-repository';
import { BaseCrudService } from './base/Base-Service';
import { IGroupRoleService } from './interfaces/i-group-role-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class GroupRoleService extends BaseCrudService<Group_Role> implements IGroupRoleService<Group_Role> {
  private GroupRoleRepository: IGroupRoleRepository<Group_Role>;
  constructor(@inject('GroupRoleRepository') GroupRoleRepository: IGroupRoleRepository<Group_Role>) {
    super(GroupRoleRepository);
    this.GroupRoleRepository = GroupRoleRepository;
  }
}
