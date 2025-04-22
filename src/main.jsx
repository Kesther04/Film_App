import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css'
import App from './users/App.jsx'
import MovieReadPage from './users/pages/MovieReadPage.jsx'
import ErrorPage from './users/pages/ErrorPage.jsx';
import AdminSignIn from './admin/auth/AdminSignIn.jsx'
import AdminSignUp from './admin/auth/AdminSignUp.jsx'
import Auth from './users/components/Auth.jsx'
import Upload from './admin/pages/Upload.jsx'
import AlterUpload from './admin/pages/AlterUpload.jsx'
import AdminIndex from './admin/AdminIndex.jsx'
import UserDetails from './admin/pages/UserDetails.jsx'
import Profile from './admin/pages/Profile.jsx'
import DeleteUpload from './admin/pages/DeleteUpload.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/movies/:movieId',
    element: <MovieReadPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/user/auth/:auth',
    element: <Auth/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/admin/auth/signin',
    element: <AdminSignIn/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/admin/auth/signup',
    element: <AdminSignUp/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/admin/',
    element: <AdminIndex/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/admin/upload',
    element: <Upload/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/admin/alter_upload',
    element: <AlterUpload/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/admin/delete_upload',
    element: <DeleteUpload/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/admin/user_details',
    element: <UserDetails/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/admin/profile',
    element: <Profile/>,
    errorElement: <ErrorPage/>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
