import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header, LeftPanel } from '../components/templates';

const MainLayout: React.FC = () => {
  const location = useLocation();

 
  const noLeftPanelPaths = ['/dashboard', '/', '/auth/login', '/users/register'];
  const showLeftPanel = !noLeftPanelPaths.includes(location.pathname);

 
  const noHeaderPaths = [ '/auth/login', '/users/register']; 

  const showHeader = !noHeaderPaths.includes(location.pathname);

  return (
    <Box>
      {/* Header */}
      {showHeader && (
        <Box sx={{ height: '140px' }}>
          <Header />
        </Box>
      )}

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          height: `calc(100vh - ${showHeader ? '140px' : '0px'})`,
          marginTop: showHeader ? '10px' : '0px',
          zIndex: '10',
        }}
      >
        {/* LeftPanel */}
        {showLeftPanel && (
          <Box sx={{ width: '300px', height: '100%' }}>
            <LeftPanel />
          </Box>
        )}

        {/* Outlet for nested routes */}
        <Box
          sx={{
            width: showLeftPanel ? 'calc(100% - 305px)' : '100%',
            padding: '20px',
            height: '100%',
            alignItems: 'start',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
