import { User } from '../models/user_model';
import { IUserRepository } from '../repositories/interfaces/i-user-repository';
import { BaseCrudService } from './base/Base-Service';
import { IUserService } from './interfaces/i-user-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class UserService extends BaseCrudService<User> implements IUserService<User> {
  private UserRepository: IUserRepository<User>;
  constructor(@inject('UserRepository') UserRepository: IUserRepository<User>) {
    super(UserRepository);
    this.UserRepository = UserRepository;
  }
}
