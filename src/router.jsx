import { createHashRouter } from "react-router";

import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Faq from './pages/Faq';
import Search from './pages/Search';
import Carts from "./pages/Carts";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import MsgSuccess from "./pages/MsgSuccess";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/Products";
import AdminCoupons from "./pages/admin/Coupons";
import AdminOrders from "./pages/admin/Orders";


let router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/faq",
        Component: Faq,
      },
      {
        path: "/search",
        Component: Search,
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/product/:id",
        Component: ProductDetail,
      },
      {
        path: "/carts",
        Component: Carts,
      },
      {
        path: "/checkout",
        Component: Checkout,
      },
      {
        path: "/msg/:id",
        Component: MsgSuccess,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
    children: [
      {
        index: true,
        Component: AdminProducts,
      },
      {
        path: "coupons",
        Component: AdminCoupons,
      },
      {
        path: "orders",
        Component: AdminOrders,
      },
    ],
  },
]);

export default router;