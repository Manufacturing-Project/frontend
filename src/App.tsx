import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { flattenedRoutes } from './routes/Routes';

const App: React.FC = () => {
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