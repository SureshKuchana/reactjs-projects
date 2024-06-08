import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";


import './index.css'
import Root from './routes/root.jsx';
import TypeAhead from './routes/typeahead/TypeAhead.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "projects/:projectId",
        element: <TypeAhead />
      }
    ]
  },
  {
    path:"/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "projects/:projectId",
        element: <h1>Project 2</h1>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
