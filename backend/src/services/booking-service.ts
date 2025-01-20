import { Booking } from '../models/booking_model';
import { IBookingRepository } from '../repositories/interfaces/i-booking-repository';
import { BaseCrudService } from './base/Base-Service';
import { IBookingService } from './interfaces/i-booking-service';
import { ITYPES } from '../types/interface-type';
import { convertToDto } from '../utils/convert-to-dto';
import { inject, injectable } from 'inversify';

@injectable()
export class BookingService extends BaseCrudService<Booking> implements IBookingService<Booking> {
  private BookingRepository: IBookingRepository<Booking>;
  constructor(@inject('BookingRepository') BookingRepository: IBookingRepository<Booking>) {
    super(BookingRepository);
    this.BookingRepository = BookingRepository;
  }
}
