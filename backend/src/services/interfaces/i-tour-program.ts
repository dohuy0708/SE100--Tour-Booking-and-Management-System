import { IBaseCrudService } from './i-base-service';
import { BaseModelType } from '../../types/base-model-type';

export interface ITourProgramService<T extends BaseModelType> extends IBaseCrudService<T> {

}
