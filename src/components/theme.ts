import { createTheme } from '@mui/material/styles';

// Define your custom colors
export const colors = {
  primary_color_green: '#08B1BA',
  secondary_color_yellow: '#FFEC40',
  font_color_textfeild: '#000000',
  secondary_background_color: '#FFFFFF',
  border_color_grey: '#757575',
  table_cell_color: "ergba(33, 150, 243, 0.08)",
  searchbar_color: '#DED8E1',
  font_searchbar: '#8BA3CB',
  alert_success: '#2E7D32',
  alert_error: '#D32F2F',
  alert_warning: '#EF6C00',
  textfeild_color: '#EDF0F2',
  emtybox_color: '#333',
  black_Transparent_8: 'rgba(0, 0, 0, 0.8)',
  black_Transparent_9: 'rgba(0, 0, 0, 0.9)',
  black_Transparent_1: 'rgba(0, 0, 0, 0.1)',
  item_background_color: '#f9f9f9',
};

export const font = {
  base_font_size_h4: '16px',
  base_font_size_menubar: '26px',
};

export const fontweight = {
  
  
  base_font_weight_Medium: 500,
  base_font_weight_SemiBold: 600,
  base_font_weight_Bold: 700,
  base_font_weight_ExtraBold: 800,
  base_font_weight_Black: 900,
};

export const gap = {
  base_gap_8: '8px',
  base_gap_32: '32px',
  base_gap_40: '40px',
  base_gap_10: '10px',
};

// Define your shadows


// Extend the Material UI theme to include custom colors
declare module '@mui/material/styles' {
  interface Theme {
    colors: typeof colors;
    font: typeof font;
    fontweight: typeof fontweight;
    gap: typeof gap;
    
  }
  interface ThemeOptions {
    colors?: typeof colors;
    font?: typeof font;
    fontweight?: typeof fontweight;
    gap?: typeof gap;
    
  }
}

// Create a theme that includes both the custom colors and Material UI's default settings
const theme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
  colors,
  font,
  fontweight,
  gap,
   // Make sure to include the shadows here
});

export default theme;
