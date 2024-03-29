import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const styles = {
  global: props => ({
    body: {
      bg: mode('white', 'inherit')(props),
      overflow: "overlay"
    },
    '*': {
      fontFamily: 'DM sans'
    }
  })
}

const colors = {
  brand: {
    50: "#193766",
    100: "#193766",
    200: "#193766",
    300: "#193766",
    400: "#193766",
    500: "#193766",
    600: "#193766",
    700: "#193766",
    800: "#193766",
    900: "#193766",
  },
  sub: {
    50: "#697B98",
    100: "#697B98",
    200: "#697B98",
    300: "#697B98",
    400: "#697B98",
    500: "#697B98",
    600: "#697B98",
    700: "#697B98",
    800: "#697B98",
    900: "#697B98",
  },
  primary: {
    400: "#3B82F6"
  }
}

const fonts = {
  fonts: {
    heading: 'DM Sans, sans-serif',
    body: 'DM Sans, sans-serif',
  }
}

const theme = extendTheme({ config, styles, fonts, colors })

export default theme