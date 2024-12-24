import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./app/routes";
import "./app/styles/App.css";
import DefaultComponent from "./app/components/DefaultComponent/DefaultComponent";

function App() {
  return (
    <div>
      {" "}
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowLayout ? DefaultComponent : Fragment;

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                    {/* <ProtectedRoute
                      element={Page}
                      roles={route.roles || []}
                      userRole={userRole}
                    /> */}
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
