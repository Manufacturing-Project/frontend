import { createTheme } from '@mui/material/styles';
// Define your custom colors
export const colors = {
    background_color: '#ECECFC',

    secondary_background_color: '#FFFFFF',

    font_color_h1: '#101540',
    font_color_textfeild: '#000000',
    font_color_button: '#FFFFFF',
    font_color_logout: '#273A34',
    font_color_nextpre: '#9E9E9E',
    font_color_green: '#1F9254',
    font_color_orange: '#CD6200',
    font_color_red: '#A30D11',
    font_placeholder: '#767474',
    

    table_color_evenrow: '#F7F6FE',
    table_color_oddrow: '#FFFFFF',
    table_color_greenbackground: '#EBF9F1',
    table_color3_orangebackground: '#FEF2E5',
    table_color4_redbackground: '#FBE7E8',

    button_background_main: '#101540',
    button_background_Logout: '#979A9C',
    button_background_table: '#624DE3',

   textfeild_color: '#EDF0F2',

   searchbar_color: '#9E9E9E',

   Itembox_background_color: '#D9D9D9'
};

export const font = {

    base_font_size_h1: '28px',
    base_font_size_h2: '22px',
    base_font_size_h3: '18px',
    base_font_size_h4: '16px',
    base_font_size_h5: '13.87px',
    base_font_size_h6: '12px',
    base_font_size_p: '14px'
};

export const fontweight = {

    base_font_weight_Thin: 100,
    base_font_weight_ExtraLight: 200,
    base_font_weight_Light: 300,
    base_font_weight_Normal: 400,
    base_font_weight_Medium: 500,
    base_font_weight_SemiBold: 600,
    base_font_weight_Bold: 700,
    base_font_weight_ExtraBold: 800,
    base_font_weight_Black : 900


};

// Extend the Material UI theme to include custom colors
declare module '@mui/material/styles' {
  interface Theme {
    colors: typeof colors;
    font: typeof font;
    fontweight: typeof fontweight;
  }
  interface ThemeOptions {
    colors?: typeof colors;
    font?: typeof font;
    fontweight?: typeof fontweight;
  }
}

// Create a theme that includes both the custom colors and Material UI's default settings
const theme = createTheme({
  colors,
  font,
  fontweight
  
});

export default theme;


   