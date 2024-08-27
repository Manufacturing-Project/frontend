import { createTheme } from '@mui/material/styles';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Palette = {

    primary: {
        background_color: '#ECECFC' 
    },

    Secondary: {
        background_color: '#FFFFFF',
    },

    font: {

    font_color_h1: '#101540',
    font_color_textfeild: '#000000',
    font_color_button: '#FFFFFF',
    font_color_logout: '#273A34',
    font_color_nextpre: '#9E9E9E',
    font_color_green: '#1F9254',
    font_color_orange: '#CD6200',
    font_color_red: '#A30D11',
    font_placeholder: '#767474',
    },

    table:{

    table_color_evenrow: '#F7F6FE',
    table_color_oddrow: '#FFFFFF',
    table_color_greenbackground: '#EBF9F1',
    table_color3_orangebackground: '#FEF2E5',
    table_color4_redbackground: '#FBE7E8',
    },

    button:{

    button_background_main: '#101540',
    button_background_Logout: '#979A9C',
    button_background_table: '#624DE3',
    },

    textfeild:{
    textfeild_color: '#EDF0F2'
    }


};

declare module '@mui/material/styles' {
    interface Theme {
      Palette : typeof Palette;
      
    }
    interface ThemeOptions {
        Palette? : typeof Palette;
    }
  }

  const theme = createTheme({
    
    Palette
    
    
  });
  export default theme;

  