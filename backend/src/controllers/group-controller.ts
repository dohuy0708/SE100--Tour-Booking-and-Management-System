import { IGroupService } from '../services/interfaces/i-group-service';
import { inject, injectable } from 'inversify';
import { ITYPES } from '../types/interface-type';
import { Group } from '../models/group_model';
import { IBaseCrudController } from './interface/i-base-crud-controller';
import { NextFunction, Request, Response } from 'express';
import { convertToDto } from '../utils/convert-to-dto';
import BaseError from '../utils/base-error';
import { ErrorCode } from '../enum/error-code-enum';
import { validateRequest } from '../utils/validate-request';


@injectable()
export class GroupController {
  public common: IBaseCrudController<Group>;
  private GroupService: IGroupService<Group>;
  constructor(
    @inject('GroupService') GroupService: IGroupService<Group>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.GroupService = GroupService;
    this.common = common;
  }
}
