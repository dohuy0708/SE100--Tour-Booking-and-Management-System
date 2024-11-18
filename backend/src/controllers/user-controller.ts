import { IUserService } from '../services/interfaces/i-user-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { User } from '../models/user_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class UserController {
  public common: IBaseCrudController<User>;
  private UserService: IUserService<User>;
  constructor(
    @inject('UserService') UserService: IUserService<User>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.UserService = UserService;
    this.common = common;
  }
}
