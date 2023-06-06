import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@material-tailwind/react";
import './index.css'
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={routes}></RouterProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
