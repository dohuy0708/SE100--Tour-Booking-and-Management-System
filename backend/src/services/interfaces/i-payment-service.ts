import { IBaseCrudService } from './i-base-service';
import { BaseModelType } from '../../types/base-model-type';

export interface IPaymentService<T extends BaseModelType> extends IBaseCrudService<T> {

}
