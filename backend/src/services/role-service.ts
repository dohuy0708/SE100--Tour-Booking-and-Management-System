import { Role } from '../models/role_model';
import { IRoleRepository } from '../repositories/interfaces/i-role-repository';
import { BaseCrudService } from './base/Base-Service';
import { IRoleService } from './interfaces/i-role-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class RoleService extends BaseCrudService<Role> implements IRoleService<Role> {
  private RoleRepository: IRoleRepository<Role>;
  constructor(@inject('RoleRepository') RoleRepository: IRoleRepository<Role>) {
    super(RoleRepository);
    this.RoleRepository = RoleRepository;
  }
}
