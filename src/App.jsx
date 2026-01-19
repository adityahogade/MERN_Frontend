import { Routes, Route, Navigate } from "react-router-dom";
import { createContext, useState } from "react";

import Login from "./pages/CommonLogin";
import Signup from "./pages/User/signup";

import Home from "./pages/User/home";
import Profile from "./pages/User/profile";
import Mycourses from "./pages/User/mycourses";
import { Register } from "./pages/User/register_to_course";
import VideosByCourse from "./pages/User/mycourseswithvideo";
import ChangePassword from "./pages/User/changepass";

import AdminHome from "./pages/Admin/Home";
import AllStudents from "./pages/Admin/AllStudents";
import UpdateCourse from "./pages/Admin/updateCourses";
import AddCourses from "./pages/Admin/AddCourses";
import AllCourses from "./pages/Admin/AllCourses";
import AdminVideosByCourse from "./pages/Admin/VideosByCourse";
import AllVideo from "./pages/Admin/Allvideo";
import AddVideo from "./pages/Admin/AddVideo";
import UpdateVideo from "./pages/Admin/updateVideo";

import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

export const LoginContext = createContext();

function App() {
  const [loginStatus, setLoginStatus] = useState(
    sessionStorage.getItem("token") ? true : false
  );

  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
      <Routes>
        {/* ✅ Common Login */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/home"
          element={
            <UserRoutes>
              <Home />
            </UserRoutes>
          }
        />
        <Route
          path="/register/:id"
          element={
            <UserRoutes>
              <Register />
            </UserRoutes>
          }
        />
        <Route
          path="/mycourses"
          element={
            <UserRoutes>
              <Mycourses />
            </UserRoutes>
          }
        />
        <Route
          path="/mycourseswithvideo/:course_id"
          element={
            <UserRoutes>
              <VideosByCourse />
            </UserRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <UserRoutes>
              <Profile />
            </UserRoutes>
          }
        />
        <Route
          path="/changepass"
          element={
            <UserRoutes>
              <ChangePassword />
            </UserRoutes>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/home"
          element={
            <AdminRoutes>
              <AdminHome />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/my-videos/:course_id"
          element={
            <AdminRoutes>
              <AdminVideosByCourse />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/allvideos"
          element={
            <AdminRoutes>
              <AllVideo />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/addvideos"
          element={
            <AdminRoutes>
              <AddVideo />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/update-video/:id"
          element={
            <AdminRoutes>
              <UpdateVideo />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/allstudents"
          element={
            <AdminRoutes>
              <AllStudents />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/updatecourse/:id"
          element={
            <AdminRoutes>
              <UpdateCourse />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/addcourse"
          element={
            <AdminRoutes>
              <AddCourses />
            </AdminRoutes>
          }
        />
        <Route
          path="/admin/allcourse"
          element={
            <AdminRoutes>
              <AllCourses />
            </AdminRoutes>
          }
        />

        {/* ✅ Not Found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </LoginContext.Provider>
  );
}

export default App;
