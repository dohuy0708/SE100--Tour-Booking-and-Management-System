import { GroupRoleController } from '../controllers/group-role-controller';
import { GroupRoleService } from '../services/group-role-service';
import { Group_Role } from '../models/group_role_model';
import { GroupRoleRepository } from '../repositories/group-role-repository';
import { IGroupRoleService } from '../services/interfaces/i-group-role-service';
import { IGroupRoleRepository } from '../repositories/interfaces/i-group-role-repository';
import { BaseContainer } from './base-container';

class GroupRoleContainer extends BaseContainer {
  constructor() {
    super(Group_Role);

    this.container.bind<IGroupRoleService<Group_Role>>('GroupRoleService').to(GroupRoleService);

    this.container.bind<IGroupRoleRepository<Group_Role>>('GroupRoleRepository').to(GroupRoleRepository);

    this.container.bind<GroupRoleController>(GroupRoleController).toSelf();
  }

  export() {
    const groupRoleController = this.container.get<GroupRoleController>(GroupRoleController);
    const groupRoleService = this.container.get<IGroupRoleService<Group_Role>>('GroupRoleService');
    return { groupRoleController, groupRoleService };
  }
}

const groupRoleContainer = new GroupRoleContainer();
const { groupRoleController, groupRoleService } = groupRoleContainer.export();
export { groupRoleController, groupRoleService };
