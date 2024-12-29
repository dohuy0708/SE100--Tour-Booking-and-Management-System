import { IBookingRepository } from './interfaces/i-booking-repository';
import { Booking } from '../models/booking_model';
import { BaseRepository } from './base/Base-Repository';
import { ITYPES } from '../types/interface-type';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class BookingRepository extends BaseRepository<Booking> implements IBookingRepository<Booking> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Booking));
  }
}
