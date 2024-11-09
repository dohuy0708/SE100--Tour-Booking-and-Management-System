import { IBaseCrudService } from './../../services/interfaces/i-base-service';
import { BaseModelType } from '../../types/base-model-type';
import { Page } from '../../types/page-type';
import { NextFunction, Request, Response } from 'express';

export interface IBaseCrudController<MODEL> {
  findOne(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  findWithPaging(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
