import LandingPageNavBar from '../../components/LandingPageNavBar'
import LandingPageTopComponent from '../../components/LandingPageTopComponent'
import LandingPageMidComponent from '../../components/LandingPageMidComponent'
import { ReactComponent as LandingRect } from '../../assets/icons/landing-rect.svg'
import { Box } from '@chakra-ui/react'

const LandingPage = () => {
  return (
    <Box
      bg={"linear-gradient(180deg, #E4EFFF 0%, rgba(228, 239, 255, 0.6) 92.51%, rgba(228, 239, 255, 0) 100%)"}
      height={'fit-content'}>
      <Box position={"absolute !important"} zIndex={"0"} right={"0"} display={{ base: 'none', lg: 'block' }}>
        <LandingRect />
      </Box>
      <LandingPageTopComponent>
        <LandingPageNavBar />
      </LandingPageTopComponent>
      <LandingPageMidComponent />
    </Box>
  );
}

export default LandingPage;
