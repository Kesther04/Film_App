import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css'
import App from './users/App.jsx'
import MovieReadPage from './users/pages/MovieReadPage.jsx'
import ErrorPage from './users/pages/ErrorPage.jsx';
import AdminSignIn from './admin/auth/AdminSignIn.jsx'
import AdminSignUp from './admin/auth/AdminSignUp.jsx'
import AdminControlUnit from './admin/AdminControlUnit.jsx'
import Auth from './users/components/Auth.jsx'
import Logout from './admin/pages/Logout.jsx'



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
    element: <AdminControlUnit/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/admin/logout',
    element: <Logout/>,
    errorElement: <ErrorPage/>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
