import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./pages/Home/Home";
import AllProducts from "./pages/AllProducts/AllProducts";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Login from "./pages/Login/Login";
import NewProduct from "./pages/NewProduct/NewProduct";
import MyCart from "./pages/MyCart/MyCart";
import NotFound from "./pages/NotFound/NotFound";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import Join from "./pages/Join/Join";
import UserPage from "./pages/UserPage/UserPage";
import BookMark from "./pages/BookMark.jsx/BookMark";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/products", element: <AllProducts /> },
      { path: "/join", element: <Join /> },
      { path: "/mypage", element: <UserPage /> },
      { path: "/bookmark", element: <BookMark /> },
      {
        path: "/products/new",
        element: (
          <ProtectedRoute requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/carts",
        element: (
          <MyCart />
        ),
      },
    ],
  },
], {
  basename: process.env.PUBLIC_URL,
});

const root = ReactDOM.createRoot(document.getElementById("wrap"));
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
