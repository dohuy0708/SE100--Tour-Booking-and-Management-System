import { IUserRepository } from './interfaces/i-user-repository';
import { User } from '../models/user_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class UserRepository extends BaseRepository<User> implements IUserRepository<User> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(User));
  }
}
