import LandingPageNavBar from '../../components/LandingPage/LandingPageNavBar'
import LandingPageTopComponent from '../../components/LandingPage/LandingPageTopComponent'
import LandingPageMidComponent from '../../components/LandingPage/LandingPageMidComponent'
import LandingPageBotComponent from '../../components/LandingPage/LandingPageBotComponent'
import LandingPageFooter from '../../components/LandingPage/LandingPageFooter'
import { ReactComponent as LandingRect } from '../../assets/icons/landing-rect.svg'
import { Box } from '@chakra-ui/react'

const LandingPage = () => {
  return (
    <Box>
      <Box
        bg={"linear-gradient(180deg, #E4EFFF 0%, rgba(228, 239, 255, 0.6) 92.51%, rgba(228, 239, 255, 0) 100%)"}
        minHeight={'100vh'}>
        <Box position={"absolute !important"} zIndex={"0"} right={"0"} display={{ base: 'none', lg: 'block' }}>
          <LandingRect />
        </Box>
        <LandingPageTopComponent>
          <LandingPageNavBar />
        </LandingPageTopComponent>
        <LandingPageMidComponent />
      </Box>
      <LandingPageBotComponent />
      <LandingPageFooter />
    </Box>

  );
}

export default LandingPage;
