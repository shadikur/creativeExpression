import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@material-tailwind/react";
import './index.css'
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.jsx';
import AppContext from './AppContext/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const darkTheme = ({
//   component: {
//     defaultProps: { ... },
//     valid: { ... },
//     styles: { ... }
//   }
// });
// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppContext>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes}></RouterProvider>
        </QueryClientProvider>
      </AppContext>
    </ThemeProvider>
  </React.StrictMode>,
)
