import { Request } from 'express';

export interface CustomRequest extends Request {
  identity?: {
    id: string;
    group_id: string;
    [key: string]: any;
  };
}

