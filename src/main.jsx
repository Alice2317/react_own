import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router";
import 'bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

import router from "./router.jsx";
import './assets/all.scss';

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
