import { RoleController } from '../controllers/role-controller';
import { RoleService } from '../services/role-service';
import { Role } from '../models/role_model';
import { RoleRepository } from '../repositories/role-repository';
import { IRoleService } from '../services/interfaces/i-role-service';
import { IRoleRepository } from '../repositories/interfaces/i-role-repository';
import { BaseContainer } from './base-container';

class RoleContainer extends BaseContainer {
  constructor() {
    super(Role);

    this.container.bind<IRoleService<Role>>('RoleService').to(RoleService);

    this.container.bind<IRoleRepository<Role>>('RoleRepository').to(RoleRepository);

    this.container.bind<RoleController>(RoleController).toSelf();
  }

  export() {
    const roleController = this.container.get<RoleController>(RoleController);
    const roleService = this.container.get<IRoleService<Role>>('RoleService');
    return { roleController, roleService };
  }
}

const roleContainer = new RoleContainer();
const { roleController, roleService } = roleContainer.export();
export { roleController, roleService };
