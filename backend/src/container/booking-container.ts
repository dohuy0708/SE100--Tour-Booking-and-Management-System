import { BookingController } from '../controllers/booking-controller';
import { BookingService } from '../services/booking-service';
import { Booking } from '../models/booking_model';
import { BookingRepository } from '../repositories/booking-repository';
import { IBookingService } from '../services/interfaces/i-booking-service';
import { IBookingRepository } from '../repositories/interfaces/i-booking-repository';
import { BaseContainer } from './base-container';

class BookingContainer extends BaseContainer {
  constructor() {
    super(Booking);

    this.container.bind<IBookingService<Booking>>('BookingService').to(BookingService);

    this.container.bind<IBookingRepository<Booking>>('BookingRepository').to(BookingRepository);

    this.container.bind<BookingController>(BookingController).toSelf();
  }

  export() {
    const bookingController = this.container.get<BookingController>(BookingController);
    const bookingService = this.container.get<IBookingService<Booking>>('BookingService');
    return { bookingController, bookingService };
  }
}

const bookingContainer = new BookingContainer();
const { bookingController, bookingService } = bookingContainer.export();
export { bookingController, bookingService };
