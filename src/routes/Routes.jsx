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
import PendingDonationRequests from "../components/PendingDonationRequest";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DonationRequestDetails from "../Pages/DonationRequestDetails/DonationRequestDetails";
import SearchPage from "../Pages/SearchPage/SearchPage";
import EditDonationRequestForm from "../components/EditDonationRequestForm";
import VolunteerDashboardLayout from "../Layout/VolunteerDashboardLayout";



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
      },
      {
        path: "donation-requests",
        element: <PendingDonationRequests />
      },
      {
        path: "donation-requests/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path:'search',
        element:<SearchPage/>
      }
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "create-donation-request",
        element: (
          <PrivateRoute>
            <CreateDonationRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "my-donation-requests",
        element: (
          <PrivateRoute>
            <MyDonationRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-donation-request/:id", // Edit route
        element: (
          <PrivateRoute>
            <EditDonationRequestForm />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "admin-dashboard",
    element: <AdminDashboardLayout />,
    children: [
      { 
        path: "", 
        element: (
          <PrivateRoute adminOnly>
            <AdminDashboardHome />
          </PrivateRoute>
        ), 
      },
      { 
        path: "all-users", 
        element: (
          <PrivateRoute adminOnly>
            <AllUsers />
          </PrivateRoute>
        ), 
      },
      { 
        path: "all-blood-donation-requests", 
        element: (
          <PrivateRoute adminOnly>
            <AllDonationRequest />
          </PrivateRoute>
        ), 
      },
      { 
        path: "content-management", 
        element: (
          <PrivateRoute adminOnly>
            <ContentManagementPage />
          </PrivateRoute>
        ), 
      },
      { 
        path: "add-blog", 
        element: (
          <PrivateRoute adminOnly>
            <AddBlog />
          </PrivateRoute>
        ), 
      },
      {
        path: "edit-donation-request/:id", // Edit route
        element: (
          <PrivateRoute>
            <EditDonationRequestForm />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path:'volunteer-dashboard',
    element:<VolunteerDashboardLayout/>
  }
]);
