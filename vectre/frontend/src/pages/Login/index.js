import React from 'react'
import { ReactComponent as LandingRect } from '../../assets/icons/landing-rect.svg'
import { Box } from '@chakra-ui/react'
import Login from "../../components/Login/Login"
import ToastContainer from "../../components/Containers/ToastContainer";

const LoginPage = () => {
  return (
      <ToastContainer>
        <Box>
          <Box
            bg={"linear-gradient(180deg, #E4EFFF 0%, rgba(228, 239, 255, 0.6) 92.51%, rgba(228, 239, 255, 0.6) 100%)"}
            minHeight={'100vh'}>
            <Box position={"absolute !important"} zIndex={"-1"} right={"0"} display={{ base: 'none', lg: 'block' }}>
              <LandingRect />
            </Box>
            <Box>
              <Login />
            </Box>
          </Box>
        </Box>
      </ToastContainer>
  );
}

export default LoginPage;
