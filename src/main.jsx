import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css'
import App from './users/App.jsx'
import MovieReadPage from './users/pages/MovieReadPage.jsx'
import ErrorPage from './users/pages/ErrorPage.jsx';
import SignIn from './users/auth/SignIn.jsx'
import SignUp from './users/auth/SignUp.jsx'



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
    path: '/user/auth/signin',
    element: <SignIn/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/user/auth/signup',
    element: <SignUp/>,
    errorElement: <ErrorPage/>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
