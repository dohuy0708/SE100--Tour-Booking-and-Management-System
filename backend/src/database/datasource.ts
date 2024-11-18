import 'dotenv/config';
import { Booking } from '../models/booking_model';
import { Feedback } from '../models/feedback_model';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { BaseModel } from '../models/base-model';
import { Group } from '../models/group_model';
import { Group_Role } from '../models/group_role_model';
import { Location } from '../models/location_model';
import { Passenger } from '../models/passenger_model';
import { Payment } from '../models/payment_model';
import { Role } from '../models/role_model';
import { Schedule } from '../models/schedule_model';
import { Tour_Location } from '../models/tour_location_model';
import { Tour } from '../models/tour_model';
import { TourMedia } from '../models/tourmedia_model';
import { TourPolicy } from '../models/tourpolicy_model';
import { TourPrice } from '../models/tourprice_model';
import { TourProgram } from '../models/tourprogram_model';
import { User } from '../models/user_model';
import { GlobalConfig } from '../utils/global-config';

const models = [
  Booking,
  Role,
  BaseModel,
  Feedback,
  Group,
  Group_Role,
  Location,
  Passenger,
  Schedule,
  Tour_Location,
  Tour,
  TourMedia,
  TourPolicy,
  TourPrice,
  TourProgram,
  Payment,
  User
];

export class AppDataSourceSingleton {
  private static instance: DataSource;

  private constructor() {}

  public static getInstance(): DataSource {
    if (!AppDataSourceSingleton.instance) {
      AppDataSourceSingleton.instance = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3006,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'hp31032004',
        database: process.env.DB_NAME || 'tour_db',
        entities: models,
        synchronize: GlobalConfig.database.sync,
        logging: true,
        migrations: [__dirname + '/migrations/*.js']
      });
    }
    return AppDataSourceSingleton.instance;
  }
}

export const AppDataSource = AppDataSourceSingleton.getInstance();
