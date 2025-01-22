import {
  createBrowserRouter
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Profile from "../components/Profile";
import DashboardHome from "../components/DashboardHome";
import CreateDonationRequest from "../components/CreateDonationRequest";
import MyDonationRequests from "../components/MyDonationRequest";
import AdminDashboardHome from "../components/AdminDashboardHome";
import AdminDashboardLayout from "../Layout/AdminDashboardLayout";
import AllUsers from "../components/AllUser";
import AllDonationRequest from "../components/AllDonationRequest";
import ContentManagementPage from "../components/ContentManagementPage";
import AddBlog from "../components/AddBlog";


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
        path: "",
        element: <DashboardHome />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest />
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests />
      }
    ]
  },
  {
    path: "admin-dashboard",
    element: <AdminDashboardLayout />,
    children: [
      { path: "", element: <AdminDashboardHome /> },
      { path: "all-users", element: <AllUsers /> },
      { path: "all-blood-donation-requests", element: <AllDonationRequest /> },
      { path: "content-management", element: <ContentManagementPage /> },
      { path: "add-blog", element: <AddBlog /> },  
    ],
  },
  
]);
