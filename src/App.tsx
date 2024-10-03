import React from 'react';
import { AddRawMaterialPage, Dashboard } from './components/page';
import { UnitOfMeasure } from './components/page/unitOfMeasure/UnitOfMeasure';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header, LeftPanel } from './components/organism';
import { Category } from './components/page/category/Category';
import { Variants } from './components/page/variants/variants'; 




function App() {
  const location = useLocation();

  const noLeftPanelPaths = ['/dashboard'];
  const showLeftPanel = !noLeftPanelPaths.includes(location.pathname);


  return (
    <Box> 
      <Header />
      <Box sx={{ display: 'flex' }}>
     
      {showLeftPanel && (
          <Box sx={{ 
            width: '290px' ,
            position: 'relative',
          }}>
            <LeftPanel />
          </Box>
        )}
      
        <Box
        sx={{
          width: showLeftPanel ? 'calc(100% - 290px)' : '100%', 
          padding: '20px',
        }}
        >
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/register/material' element={<AddRawMaterialPage />} />
            <Route path='/setting' element={<SettingLayout />}>
            <Route index element={<Navigate to="unit" />} />
              <Route path='unit' element={<UnitOfMeasure />} />
              <Route path='category' element={<Category />} />
              <Route path='variants' element={<Variants />} />
              <Route index element={<Navigate to="unit" />} />
            </Route>
          </Routes>
        </Box>  
      </Box>
    </Box>

  );
}

function SettingLayout() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

function RegisterationLayout() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default App;
