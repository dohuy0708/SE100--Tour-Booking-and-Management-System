import { Request, Response, NextFunction } from 'express';

const responseEnhancer = (req: Request, res: Response, next: NextFunction) => {
  res.send_ok = function (message: string, data?: any) {
    return res.status(200).json({ message, data });
  };

  res.send_badRequest = function (message: string, data?: any) {
    return res.status(400).json({ message, data });
  };

  res.send_created = function (message: string, data?: any) {
    return res.status(201).json({ message, data });
  };

  res.send_forbidden = function (message: string, data?: any) {
    return res.status(403).json({ message, data });
  };

  res.send_internalServerError = function (message: string, data?: any) {
    return res.status(500).json({ message, data });
  };

  res.send_notFound = function (message: string, data?: any) {
    return res.status(404).json({ message, data });
  };

  res.send_unauthorized = function (message: string, data?: any) {
    return res.status(401).json({ message, data });
  };

  next();
};

export default responseEnhancer;
