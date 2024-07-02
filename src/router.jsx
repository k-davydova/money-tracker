import { Navigate, createBrowserRouter } from 'react-router-dom';

import App from './App';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import RecentPage from './pages/RecentPage/RecentPage';

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
        element: <DashboardPage />,
      },
      {
        path: 'recent',
        element: <RecentPage />,
      },
      {
        path: 'analytics',
        element: <p>Hello there will be the analytic page</p>,
      },
    ],
  },
]);
