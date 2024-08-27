import { createTheme } from '@mui/material/styles';

export const Typography ={

    font:{

        size_h1: '28px',
        size_h2: '22px',
        size_h3: '18px',
        size_h4: '16px',
        size_h5: '13.87px',
        size_h6: '12px',
        size_p: '14px'
    },

    fontweight:{
          Thin: 100,
          ExtraLight: 200,
          Light: 300,
          Normal: 400,
          Medium: 500,
          SemiBold: 600,
          Bold: 700,
          ExtraBold: 800,
          Black : 900
    }
};

declare module '@mui/material/styles' {
    interface Theme {
      Typography : typeof Typography;
      
    }
    interface ThemeOptions {

        Typography? : typeof Typography;
    }
  }

  const theme = createTheme({
    
    Typography
    
    
  });
  export default theme;