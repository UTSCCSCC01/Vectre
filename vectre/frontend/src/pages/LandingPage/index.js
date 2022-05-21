import LandingPageNavBar from '../../components/LandingPageNavBar'
import LandingPageTopComponent from '../../components/LandingPageTopComponent'
import LandingPageMidComponent from '../../components/LandingPageMidComponent'
import { ReactComponent as LandingRect } from '../../assets/icons/landing-rect.svg'
import { Box } from '@chakra-ui/react'

const LandingPage = () => {
  return (
    <div>
      <Box position={"absolute !important"} zIndex={"-1"} right={"0"} >
        <LandingRect />
      </Box>
      <LandingPageTopComponent>
        <LandingPageNavBar />
      </LandingPageTopComponent>
      <LandingPageMidComponent />
    </div>
  );
}

export default LandingPage;
