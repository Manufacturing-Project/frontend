import React from 'react';
import { Box } from '@mui/material';
import RawMaterialList from './RawmaterialList';
interface Props {
  // Define your props here
}

const Dashboard: React.FC<Props> = (props) => {

  return (
    <Box>     
     <RawMaterialList />
    </Box>
  );
};

export { Dashboard };
