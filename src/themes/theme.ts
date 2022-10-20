import { ComponentStyleConfig, extendTheme, ThemeConfig } from "@chakra-ui/react"
import type { Styles, GlobalStyleProps } from "@chakra-ui/theme-tools"

import textStyles from './text-style';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}


const colors = {
  bg: {
   
  },
  color: {  
    primary: "#13172B",
  },
}

const Text: ComponentStyleConfig = {
  variants: {
    "with-title": {
      fontFamily: "StateWide",
      fontSize: "48px",
      lineHeight: "52px",
      color: 'color.white',      
    },
    "with-sub-title": {
      fontFamily: "StateWide",
      fontSize: "14px",
      lineHeight: "18px",
      color: 'color.white',      
    },
    "with-normal": {
      fontFamily: 'Inter',
      fontWeight: "600",
      fontSize: "16px",
      color: "color.white",
      lineHeight: "24px",
      textTransform: "capitalize"
    }
  }
}   



const components = {
  Text,   
}


const theme = extendTheme({
  config,
  colors,
  textStyles,
  components, 
})

export default theme;