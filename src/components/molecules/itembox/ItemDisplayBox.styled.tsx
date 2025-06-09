import styled from '@emotion/styled';
import { Box , Typography } from '@mui/material';
import theme from '../../theme'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const StyledContainerBox = styled(Box)({

        display: 'flex',
        flexDirection: 'column',
        backgroundColor : theme.colors.secondary_background_color,
        width: '100%' ,    
        padding: '16px', 
        overflowY: 'hidden',
        boxShadow:'none',

});

export const StyledItemDisplayBox = styled(Box)({

            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px',
            borderBottom: `1px solid ${theme.colors.border_color_grey}`,
            overflow: 'hidden',
})

export const StyleButtonBox = styled(Box)({
            display: 'flex', 
            justifyContent: 'space-between',
            width: '20%'
})
export const StyleItemName = styled(Typography)({  

             fontSize: '20px'
} )   

export const StyledEditButton = styled(EditIcon)({
        color: theme.colors.border_color_grey
})
export const StyledDeleteButton = styled(DeleteIcon)({
        color: theme.colors.border_color_grey   
})