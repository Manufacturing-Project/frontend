import React from 'react';
import { AddRawMaterialPage, Dashboard, Header, LeftPanel, Category, Variants, UnitOfMeasure } from './components/organism';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material'; 
 
function App() {
  const location = useLocation();
 
  const noLeftPanelPaths = ['/dashboard'];
  const showLeftPanel = !noLeftPanelPaths.includes(location.pathname);
 
 
  return (
    <Box>
  <Box sx={{ height: '140px' }}>
    <Header />
  </Box>
  <Box sx={{ display: 'flex', height: 'calc(100vh - 140px)', marginTop: '10px' }}>
    {showLeftPanel && (
      <Box sx={{
        width: '300px',
        height: '100%',
      }}>
        <LeftPanel />
      </Box>
    )}
    <Box
      sx={{
        width: showLeftPanel ? 'calc(100% - 300px)' : '100%',
        padding: '20px',
        height: '100%',
        overflowY: 'auto',
        alignItems: 'start',
      }}
    >
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<RegisterationLayout />}>
          <Route index element={<Navigate to="material" />} />
          <Route path='material' element={<AddRawMaterialPage />} />
        </Route>
        <Route path='/setting' element={<SettingLayout />}>
          <Route index element={<Navigate to="unit" />} />
          <Route path='unit' element={<UnitOfMeasure />} />
          <Route path='category' element={<Category />} />
          <Route path='variants' element={<Variants />} />
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