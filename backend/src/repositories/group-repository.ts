import { Group } from './../models/group_model';
import { IGroupRepository } from './interfaces/i-group-repository';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class GroupRepository extends BaseRepository<Group> implements IGroupRepository<Group> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Group));
  }
}
