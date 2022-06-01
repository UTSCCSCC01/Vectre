import NavBar from '../../components/NavBar'
import { ReactComponent as LandingRect } from '../../assets/icons/landing-rect.svg'
import { Box } from '@chakra-ui/react'

const Login = () => {
  return (
    <Box>
      <Box
        bg={"linear-gradient(180deg, #E4EFFF 0%, rgba(228, 239, 255, 0.6) 92.51%, rgba(228, 239, 255, 0.6) 100%)"}
        minHeight={'100vh'}>
        <Box position={"absolute !important"} zIndex={"-1"} right={"0"} display={{ base: 'none', lg: 'block' }}>
          <LandingRect />
        </Box>
        <NavBar />
      </Box>
    </Box>

  );
}

export default Login;
