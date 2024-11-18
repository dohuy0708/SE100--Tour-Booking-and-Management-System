import { IGroupRoleService } from '../services/interfaces/i-group-role-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { Group_Role } from '../models/group_role_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class GroupRoleController {
  public common: IBaseCrudController<Group_Role>;
  private GroupRoleService: IGroupRoleService<Group_Role>;
  constructor(
    @inject('GroupRoleService') GroupRoleService: IGroupRoleService<Group_Role>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.GroupRoleService = GroupRoleService;
    this.common = common;
  }
}
