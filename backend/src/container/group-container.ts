import { GroupController } from '../controllers/group-controller';
import { GroupService } from '../services/group-service';
import { Group } from '../models/group_model';
import { GroupRepository } from '../repositories/group-repository';
import { IGroupService } from '../services/interfaces/i-group-service';
import { IGroupRepository } from '../repositories/interfaces/i-group-repository';
import { BaseContainer } from './base-container';

class GroupContainer extends BaseContainer {
  constructor() {
    super(Group);

    this.container.bind<IGroupService<Group>>('GroupService').to(GroupService);

    this.container.bind<IGroupRepository<Group>>('GroupRepository').to(GroupRepository);

    this.container.bind<GroupController>(GroupController).toSelf();
  }

  export() {
    const groupController = this.container.get<GroupController>(GroupController);
    const groupService = this.container.get<IGroupService<Group>>('GroupService');
    return { groupController, groupService };
  }
}

const groupContainer = new GroupContainer();
const { groupController, groupService } = groupContainer.export();
export { groupController, groupService };
