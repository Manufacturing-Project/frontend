import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header, LeftPanel } from '../components/templates';
import { StyleMainContentBox , StyleLeftpanelBox , StyleOutletBox  , StyleHraderBox} from './MainLayout.styled';
import { any } from 'prop-types';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const noLeftPanelPaths = ['/dashboard', '/', '/auth/login', '/auth/signup'];
  const showLeftPanel = !noLeftPanelPaths.includes(location.pathname);
  const noHeaderPaths = [ '/auth/login', '/auth/signup' , '/']; 

  const showHeader = !noHeaderPaths.includes(location.pathname);

  return (
    <Box>
      {/* Header */}
      {showHeader && (
        <StyleHraderBox>
          <Header />
        </StyleHraderBox>
      )}

      {/* Main Content */}
      <StyleMainContentBox showHeader={showHeader} theme={any}>
        {/* LeftPanel */}
        {showLeftPanel && (
          <StyleLeftpanelBox>
            <LeftPanel />
          </StyleLeftpanelBox>
        )}

        {/* Outlet for nested routes */}
        <StyleOutletBox showLeftPanel={showLeftPanel} theme={any}>
          <Outlet />
        </StyleOutletBox>
        </StyleMainContentBox>
      </Box>
    
  );
};

export default MainLayout;
