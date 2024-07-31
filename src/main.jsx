import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import { SpeedInsights } from "@vercel/speed-insights/react"

import './index.css'
import Root from './routes/root.jsx';
import TypeAhead from './routes/typeahead/TypeAhead.jsx';
import VelocityChart from './routes/jiraVelocityChart/VelocityChart.jsx';
import FileExplorer from './routes/fileExplorer/FileExplorer.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "projects/typeAhead",
        element: <TypeAhead />
      },
      {
        path: "projects/jiraVelocityChart",
        element: <VelocityChart />
      },
      {
        path: "projects/fileExplorer",
        element: <FileExplorer />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <SpeedInsights />
  </React.StrictMode>,
)
