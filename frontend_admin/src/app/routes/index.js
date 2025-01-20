// src/app/routes/index.js

import adminRoutes from "./adminRoutes";
import commonRoutes from "./commonRoutes";

const routes = [...adminRoutes, ...commonRoutes];

export default routes;
