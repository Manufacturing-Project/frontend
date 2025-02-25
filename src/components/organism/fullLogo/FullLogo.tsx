import { Logo } from "../../molecules";
import { Box, Typography } from '@mui/material';
import theme from "../../theme";


export const FullLogo: React.FC = ()=>{

        return(
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
        }}
        >
          <Logo />
          <Box sx= {{
                display: 'flex',
                gap: theme.gap.base_gap_8,
          }}>
            <Typography
              variant='h4'
              sx={{
                color: theme.colors.primary_color_green,
                fontWeight: theme.fontweight.base_font_weight_Bold,
              }}
            >
              Manufacturing
            </Typography>
            <Typography
              variant='h4'
              sx={{
                color: theme.colors.secondary_color_yellow,
                fontWeight: theme.fontweight.base_font_weight_Bold,
              }}
            >
              Project
            </Typography>
          </Box>
        </Box>
        );
        
}

