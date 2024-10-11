import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header, LeftPanel } from '../components/templates';

const MainLayout: React.FC = () => {
    const location = useLocation();
 
  const noLeftPanelPaths = ['/dashboard' , '/'];
  const showLeftPanel = !noLeftPanelPaths.includes(location.pathname);

  return (
    <Box>
      <Box sx={{ height: '140px' }}>
         <Header />
        </Box>
      <Box sx={{ display: 'flex', height: 'calc(100vh - 140px)', marginTop: '10px', zIndex: '10'  }}>
        {showLeftPanel && (
        <Box sx={{ width: '300px', height: '100%', }}>
          <LeftPanel />
        </Box>
        )}
        <Box sx={{ width: showLeftPanel ? 'calc(100% - 305px)' : '100%',
            padding: '20px',
            height: '150%',
            alignItems: 'start',}}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
