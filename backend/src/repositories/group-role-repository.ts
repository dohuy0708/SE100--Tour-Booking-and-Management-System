import { IGroupRoleRepository } from './interfaces/i-group-role-repository';
import { Group_Role } from '../models/group_role_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class GroupRoleRepository extends BaseRepository<Group_Role> implements IGroupRoleRepository<Group_Role> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Group_Role));
  }
}
