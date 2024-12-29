import { UserController } from '../controllers/user-controller';
import { UserService } from '../services/user-service';
import { User } from '../models/user_model';
import { UserRepository } from '../repositories/user-repository';
import { IUserService } from '../services/interfaces/i-user-service';
import { IUserRepository } from '../repositories/interfaces/i-user-repository';
import { BaseContainer } from './base-container';

class UserContainer extends BaseContainer {
  constructor() {
    super(User);

    this.container.bind<IUserService<User>>('UserService').to(UserService);

    this.container.bind<IUserRepository<User>>('UserRepository').to(UserRepository);

    this.container.bind<UserController>(UserController).toSelf();
  }

  export() {
    const userController = this.container.get<UserController>(UserController);
    const userService = this.container.get<IUserService<User>>('UserService');
    return { userController, userService };
  }
}

const userContainer = new UserContainer();
const { userController, userService } = userContainer.export();
export { userController, userService };
