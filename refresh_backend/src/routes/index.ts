import express from 'express';

import authenticationRoute  from './authenticationRoute';
import usersRoute from './usersRoute';
import groupRoute from './groupRoute';
import bookingRoute from './bookingRoute';
import feedbackRoute from './feedbackRoute';
import group_roleRoute from './group_roleRoute';
import locationRoute from './locationRoute';
import passengerRoute from './passengerRoute';
import paymentRoute from './paymentRoute';
import roleRoute from './roleRoute';
import scheduleRoute from './scheduleRoute';
import tour_locationRoute from './tour_locationRoute';
import tour_programRoute from './tour_programRoute';
import tourRoute from './tourRoute';
import tour_mediaRoute from './tour_mediaRoute';
import tour_policyRoute from './tour_policyRoute';
import tour_priceRoute from './tour_priceRoute';

const router = express.Router();

export default():express.Router=>{
    authenticationRoute(router);
    usersRoute(router);
    groupRoute(router);
    bookingRoute(router);
    feedbackRoute(router);
    group_roleRoute(router);
    locationRoute(router);
    passengerRoute(router);
    paymentRoute(router);
    roleRoute(router);
    scheduleRoute(router);
    tour_locationRoute(router);
    tour_programRoute(router);
    tourRoute(router);
    tour_mediaRoute(router);
    tour_policyRoute(router);
    tour_priceRoute(router);
    return router;
};