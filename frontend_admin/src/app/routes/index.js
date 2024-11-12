// src/app/routes/index.js
import staffRoutes from "./staffRoutes";
import adminRoutes from "./adminRoutes";
import commonRoutes from "./commonRoutes";

const routes = [...staffRoutes, ...adminRoutes, ...commonRoutes];

export default routes;
