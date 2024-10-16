import React, { lazy } from 'react';
import ProtectedRoute from "./ProtectedRoutes";
import FullLayout from "../layout/FullLayout";

const Login = lazy(() => import("../views/Common/Login"));
const Forgot = lazy(() => import('../views/Common/Forgotpage'));
const UserHome = lazy(() => import('../views/user/UserHome'));
const UserCourses = lazy(() => import('../views/user/UserCourses'));
const UserCoursesCards = lazy(() => import('../views/user/UserCoursesCard'));
const UserTrainingPlan = lazy(() => import('../views/user/UserTrainingPlan'));
const UserTrainingCard = lazy(() => import('../views/user/UserTrainingCard'));
const UserTrainingvideo = lazy(() => import('../views/user/UserTrainingvideo'));
const Profile = lazy(() => import('../views/Common/Profile'));

const AdminHome = lazy(() => import('../views/admin/AdminHome'));
const AdminViewUser = lazy(() => import('../views/admin/AdminViewUser'));
const AdminAddUser = lazy(() => import('../views/admin/AdminAddUser'));
const AdminViewCourse = lazy(() => import('../views/admin/AdminViewCourse'));
const AdminAddCourse = lazy(() => import('../views/admin/AdminAddCourse'));
const Coursedetail = lazy(() => import('../views/admin/AdminCourseDetail'));
const AdminTrainingCard = lazy(() => import('../views/admin/AdminTrainingCard'));
const AdminAssignTrainingPlan = lazy(() => import('../views/admin/AssignTrainingPlanToUser'));
const AdminViewTrainingPlan = lazy(() => import('../views/admin/AdminViewTrainingPlan'));
const AdminAddTrainingPlan = lazy(() => import('../views/admin/AdminAddTrainingPlan'));
const AdminAddTrainingPlanCourses = lazy(() => import('../views/admin/AdminAddTrainingPlanCourses'));
const AdminViewDesignation = lazy(() => import('../views/admin/AdminViewDesignation'));
const AdminAddDesignation = lazy(() => import('../views/admin/AdminAddDesignation'));
const AdminViewRole = lazy(() => import('../views/admin/AdminViewRole'));
const AdminAddRole = lazy(() => import('../views/admin/AdminAddRole'));

// Routes
const ThemeRoutes = [
  { path: "/", exact: true, element: <Login /> },
  { path: "/forgot", element: <Forgot /> },

  {
    path: "/",
    element: <FullLayout />,
    children: [ 
      { path: "/UserHome", exact: true, element: <ProtectedRoute element={UserHome} /> },
      { path: "/UserCourses", exact: true, element: <ProtectedRoute element={UserCourses} /> },
      { path: "/UserCoursesCard", exact: true, element: <ProtectedRoute element={UserCoursesCards} /> },
      { path: "/UserTrainingPlan", exact: true, element: <ProtectedRoute element={UserTrainingPlan} /> },
      { path: "/UserTrainingCard", exact: true, element: <ProtectedRoute element={UserTrainingCard} /> },
      { path: "/UserTrainingvideo", exact: true, element: <ProtectedRoute element={UserTrainingvideo} /> },
      { path: "/Profile", exact: true, element: <ProtectedRoute element={Profile} /> },
      

      {
        path: "/AdminHome",
        exact: true,
        element: <ProtectedRoute element={AdminHome} admin />,
      },
      { path: "/AdminViewUser", exact: true, element: <ProtectedRoute element={AdminViewUser} admin/> },
      { path: "/AdminAddUser", exact: true, element: <ProtectedRoute element={AdminAddUser} admin/> },
      { path: "/AdminViewCourse", exact: true, element: <ProtectedRoute element={AdminViewCourse} admin/> },
      { path: "/AdminAddCourse", exact: true, element: <ProtectedRoute element={AdminAddCourse} admin/> },
      { path: "/Coursedetail", exact: true, element: <ProtectedRoute element={Coursedetail} admin/> },
      { path: "/AdminTrainingCard", exact: true, element: <ProtectedRoute element={AdminTrainingCard} admin/> },
      { path: "/AdminAssignTrainingPlan", exact: true, element: <ProtectedRoute element={AdminAssignTrainingPlan} admin/>},
      { path: "/AdminViewTrainingPlan", exact: true, element: <ProtectedRoute element={AdminViewTrainingPlan} admin/>},
      { path: "/AdminAddTrainingPlan", exact: true, element: <ProtectedRoute element={AdminAddTrainingPlan} admin/> },
      { path: "/AdminAddTrainingPlanCourses", exact: true, element: <ProtectedRoute element={AdminAddTrainingPlanCourses} admin/>},
      { path: "/Profile", exact: true, element: <ProtectedRoute element={Profile} admin/> },
      { path: "/AdminViewDesignation", exact: true, element: <ProtectedRoute element={AdminViewDesignation} admin/>},
      { path: "/AdminAddDesignation", exact: true, element: <ProtectedRoute element={AdminAddDesignation} admin/> },
      { path: "/AdminViewRole", exact: true, element: <ProtectedRoute element={AdminViewRole} admin/> },
      { path: "/AdminAddRole", exact: true, element: <ProtectedRoute element={AdminAddRole} admin/> },
    ],
  },
];

export default ThemeRoutes;

