import { useContext } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Checkout from "../components/Checkout/Checkout";
import ContactUs from "../components/ContactUs/ContactUs";
import DetailsProducts from "../components/DetailsProduct/DetailsProducts";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Orders from "../components/Orders/Orders";
import ShopAllProducts from "../components/ShopAllProducts/ShopAllProducts";
import Signup from "../components/Signup/Signup";
import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute";
import CheckoutBuy from "../components/Checkout/CheckoutBuy";
import MyOrders from "../Dashboard/MyOrders";
import DashboardLayout from "../layout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/shopallproducts",
        element: <ShopAllProducts></ShopAllProducts>,
      },
      {
        path: "/contactus",
        element: <ContactUs></ContactUs>,
      },
      
      {
        path: "/especipicproduct/:id",
        element: <PrivateRoute><DetailsProducts></DetailsProducts></PrivateRoute>,
        
      },
      {
        path: "/orders",
        element: <PrivateRoute><Orders></Orders></PrivateRoute>,
      },
      {
        path: "/checkout",
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
      },
      {
        path: '/checkoutBuy/:id',
        element : <PrivateRoute><CheckoutBuy></CheckoutBuy></PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },




  // Dashboard
  {
      path : '/dashboard',
      element : <DashboardLayout></DashboardLayout>,
      children : [
          {
            path : '/dashboard/myOrders',
            element : <MyOrders></MyOrders>
        }
      ]
  }
]);

export default router;
