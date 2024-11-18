import { IRoleService } from '../services/interfaces/i-role-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { Role } from '../models/role_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class RoleController {
  public common: IBaseCrudController<Role>;
  private RoleService: IRoleService<Role>;
  constructor(
    @inject('RoleService') RoleService: IRoleService<Role>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.RoleService = RoleService;
    this.common = common;
  }
}
