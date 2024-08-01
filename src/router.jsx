import { Navigate, createBrowserRouter } from 'react-router-dom';

import App from './App';
import Dashboard from './pages/Dashboard/Dashboard';
import Recent from './pages/Recent/Recent';
import Analytics from './pages/Analytics/Analytics';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'recent',
        element: <Recent />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
    ],
  },
]);
