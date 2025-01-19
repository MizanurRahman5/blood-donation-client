import {
  createBrowserRouter
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import Profile from "../components/Profile";
import DashboardHome from "../components/DashboardHome";
import CreateDonationRequest from "../components/CreateDonationRequest";
import MyDonationRequests from "../components/MyDonationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",  // Use an empty string for the default child route
        element: <DashboardHome />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path:'create-donation-request',
        element:<CreateDonationRequest/>
      },
      {
        path:'my-donation-requests',
        element:<MyDonationRequests/>
      }
    ]
  }
]);
