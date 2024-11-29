import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app/styles/App.css";
import routes from "./app/routes/index.js";
import DefaultComponent from "./app/components/DefaultComponent.js";

function App() {
  return (
    <div>
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
                  </Layout>
                }
              >
                {" "}
              </Route>
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
