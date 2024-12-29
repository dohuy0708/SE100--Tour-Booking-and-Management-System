import { IBaseCrudService } from './i-base-service';
import { BaseModelType } from '../../types/base-model-type';

export interface IBookingService<T extends BaseModelType> extends IBaseCrudService<T> {

}
