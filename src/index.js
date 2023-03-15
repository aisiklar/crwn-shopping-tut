import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
//import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home/Home.component";
import ErrorPage from "./routes/errors/error-page";
import Shop from "./routes/shop/Shop.component";
import NavBar from "./routes/navbar/NavBar.component";
import Authentication from "./routes/authentication/Authentication.component";
import { UserProvider } from "./contexts/user.context";
import { UserContext } from "./contexts/user.context";

const router = createBrowserRouter([
  {
    element: <NavBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "home",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "shop",
        element: <Shop />,
        errorElement: <ErrorPage />,
      },
      {
        path: "auth",
        element: <Authentication />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
