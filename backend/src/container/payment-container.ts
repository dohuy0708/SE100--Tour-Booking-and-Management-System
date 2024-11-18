import { PaymentController } from '../controllers/payment-controller';
import { PaymentService } from '../services/payment-service';
import { Payment } from '../models/payment_model';
import { PaymentRepository } from '../repositories/payment-repository';
import { IPaymentService } from '../services/interfaces/i-payment-service';
import { IPaymentRepository } from '../repositories/interfaces/i-payment-repository';
import { BaseContainer } from './base-container';

class PaymentContainer extends BaseContainer {
  constructor() {
    super(Payment);

    this.container.bind<IPaymentService<Payment>>('PaymentService').to(PaymentService);

    this.container.bind<IPaymentRepository<Payment>>('PaymentRepository').to(PaymentRepository);

    this.container.bind<PaymentController>(PaymentController).toSelf();
  }

  export() {
    const paymentController = this.container.get<PaymentController>(PaymentController);
    const paymentService = this.container.get<IPaymentService<Payment>>('PaymentService');
    return { paymentController, paymentService };
  }
}

const paymentContainer = new PaymentContainer();
const { paymentController, paymentService } = paymentContainer.export();
export { paymentController, paymentService };
