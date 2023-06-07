import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@material-tailwind/react";
import './index.css'
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.jsx';
import AppContext from './AppContext/AppContext';

// const darkTheme = ({
//   component: {
//     defaultProps: { ... },
//     valid: { ... },
//     styles: { ... }
//   }
// });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppContext>
        <RouterProvider router={routes}></RouterProvider>
      </AppContext>
    </ThemeProvider>
  </React.StrictMode>,
)
