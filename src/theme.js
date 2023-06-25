import { Platform } from "react-native";

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      appBar:"rgba(0,0,0,.8)",
      mainBackground:"#e1e4e8",
      red:"#d73a4a"
    },
    fontSizes: {
      body: 20,
      subheading:25,
      heading:30
      
    },
    fonts:Platform.select( {
      android:"Roboto",
      ios:"Arial",
      default: 'System',
    }),
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    
  };
  
  export default theme;