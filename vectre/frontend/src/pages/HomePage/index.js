import NavBar from "../../components/NavBar";
import PostComponent from "../../components/PostComponent/PostComponent";

import { ReactComponent as LandingRect } from '../../assets/icons/landing-rect.svg'
import {
  Box,
  Stack
} from '@chakra-ui/react'

const samplePostData = [
  {
    timestamp: "12:47 AM · May 25, 2022",
    text: "Doodles are headed to NYC 🍎. June 21-23: Midtown Manhattan. RSVP for Doodles and Dooplicator holders will open next week.",
    author: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
    imageURL: "https://ipfs.io/ipfs/QmfFyFzv3UPm1jRpBURZ87xFM4Nke6NkrQEKVRLKSuHWFk",
    edited: false
  },
  {
    timestamp: "2:43 PM · May 26, 2022",
    text: `I listened to the Doom soundtrack while designing these. Mainly the song "BFG Division". Look at the demon sneaker while listening to it, trust me. You will get the vibe. 👹`,
    author: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
    imageURL: "https://ipfs.io/ipfs/QmfFyFzv3UPm1jRpBURZ87xFM4Nke6NkrQEKVRLKSuHWFk",
    edited: false
  },
  {
    timestamp: "5:43 PM · May 27, 2022",
    text: "I like ETH",
    author: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
    imageURL: "https://ipfs.io/ipfs/QmfFyFzv3UPm1jRpBURZ87xFM4Nke6NkrQEKVRLKSuHWFk",
    edited: false
  }
]

const HomePage = () => {
  return (
    <Box>
      <Box
        bg={"linear-gradient(180deg, #E4EFFF 0%, rgba(228, 239, 255, 0.6) 92.51%, rgba(228, 239, 255, 0.6) 100%)"}
        minHeight={'100vh'}>
        <Box position={"absolute !important"} zIndex={"-1"} right={"0"} display={{ base: 'none', lg: 'block' }}>
          <LandingRect />
        </Box>
        <Box>
          <NavBar />
          <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
            <Stack alignSelf={'center'} gap={'36px'}>
              {/* Add posts below */}
              {
                samplePostData.map((item, i) => {
                  return (
                    <Box key={i}>
                      <PostComponent item={item} />
                    </Box>
                  )
                })
              }
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
