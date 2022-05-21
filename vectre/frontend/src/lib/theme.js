import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const styles = {
  global: props => ({
    body: {
      bg: mode('linear-gradient(180deg, #E4EFFF 0%, rgba(228, 239, 255, 0.6) 92.51%, rgba(228, 239, 255, 0) 100%);', 'inherit')(props)
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