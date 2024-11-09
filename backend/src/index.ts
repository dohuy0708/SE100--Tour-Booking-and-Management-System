import { ErrorCode } from './enum/error-code-enum';
import express from 'express';
import BookRoutes from './routes/booking-routes';
import FeedRoutes from './routes/feedback-routes';
import GroRoutes from './routes/group-routes';
import LocRoutes from './routes/location-routes';
import PassRoutes from './routes/passenger-routes';
import RoleRoutes from './routes/role-routes';
import ScheRoutes from './routes/schedule-routes';
import TourMediRoutes from './routes/tour-media-routes';
import TourPoliRoutes from './routes/tour-poli-routes';
import TourProRoutes from './routes/tour-program-routes';
import TourRoutes from './routes/tour-routes';
import UserRoutes from './routes/user-routes';
import BaseError from './utils/base-error';
import responseEnhancer from './middleware/response-enhancer-middleware';


export function route(app:any, root_api:string)
{
    app.use(`${root_api}/booking`, BookRoutes);
    app.use(`${root_api}/feedback`, FeedRoutes);
    app.use(`${root_api}/group`, GroRoutes);
    app.use(`${root_api}/location`, LocRoutes);
    app.use(`${root_api}/passenger`, PassRoutes);
    app.use(`${root_api}/role`, RoleRoutes);
    app.use(`${root_api}/schedule`, ScheRoutes);
    app.use(`${root_api}/tourmedia`, TourMediRoutes);
    app.use(`${root_api}/tourpolicy`, TourPoliRoutes);
    app.use(`${root_api}/tourprogram`, TourProRoutes);
    app.use(`${root_api}/tour`, TourRoutes);
    app.use(`${root_api}/user`, UserRoutes);



    app.get(`${root_api}/health`, (req: any, res: any) => {
        res.json({
          message: 'OK'
        });
      });

      
     // Handle API not exists
  app.all('*', (req: any, res: any, next: any) => {
    const err = new BaseError(ErrorCode.API_NOT_EXISTS, 'API Not Exists');
    next(err);
  });
}

const app = express();



app.get('/', (req, res) => {
    res.send('5H Hello');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})