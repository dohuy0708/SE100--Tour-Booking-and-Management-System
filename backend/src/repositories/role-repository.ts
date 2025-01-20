import { IRoleRepository } from './interfaces/i-role-repository';
import { Role } from '../models/role_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class RoleRepository extends BaseRepository<Role> implements IRoleRepository<Role> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Role));
  }
}
