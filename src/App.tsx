import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation, useRoutes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { flattenedRoutes } from './routes/Routes';

const App: React.FC = () => {

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const routing = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: flattenedRoutes, 
    },
  ]);

  return routing;
};

export default App;