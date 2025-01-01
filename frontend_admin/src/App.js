import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./app/routes";
import "./app/styles/App.css";
import DefaultComponent from "./app/components/DefaultComponent/DefaultComponent";
import ProtectedRoute from "./app/routes/ProtectedRoute";
import { AuthProvider } from "./app/context/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowLayout ? DefaultComponent : Fragment;
              // Kiểm tra nếu route là /login hoặc /forgot_password thì không cần ProtectedRoute
              const isPublicRoute =
                route.path === "/login" || route.path === "/forgot_password";

              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      {isPublicRoute ? (
                        <Page /> // Nếu là trang công khai (login, forgot_password), không cần ProtectedRoute
                      ) : (
                        <ProtectedRoute roles={route.roles || []}>
                          <Page />
                        </ProtectedRoute>
                      )}
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
