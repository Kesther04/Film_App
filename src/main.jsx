import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css'
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
import SerieReadPage from './users/pages/SerieReadPage.jsx'
import MoviesPage from './users/pages/MoviesPage.jsx'
import SeriesPage from './users/pages/SeriesPage.jsx'
import Animations from './users/pages/Animations.jsx'
import Home from './users/Home.jsx'
import SearchPageHandler from './users/pages/SearchPageHandler.jsx'
import { QueryProvider } from './users/context/QueryContext.jsx'
import Streams from './users/pages/Streams.jsx'
import Downloads from './users/pages/Downloads.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/search',
    element: <SearchPageHandler/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/movies',
    element: <MoviesPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/series',
    element: <SeriesPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/animation',
    element: <Animations/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/movies/:movieId',
    element: <MovieReadPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/series/:serieId',
    element: <SerieReadPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/watch_history',
    element: <Streams/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/download_history',
    element: <Downloads/>,
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
  <QueryProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </QueryProvider>
)
