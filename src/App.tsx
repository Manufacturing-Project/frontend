import React from 'react';
import { AddRawMaterialPage, Dashboard } from './components/page';
import { UnitOfMeasure } from './components/page/unitOfMeasure/UnitOfMeasure';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { Header, LeftPanel } from './components/organism';
import { Category } from './components/page/category/Category';


function App() {
  const location = useLocation();

  const noLeftPanelPaths = ['/dashboard'];
  const showLeftPanel = !noLeftPanelPaths.includes(location.pathname);


  return (
    <Box> 
      <Header />
      <Box sx={{ display: 'flex' }}>
     
      {showLeftPanel && (
          <Box sx={{ width: '290px' }}>
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
          </Routes>
        </Box>
      </Box>
    </Box>

  );
}

export default App;
