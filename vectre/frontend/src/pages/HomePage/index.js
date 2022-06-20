import AppWrapper from "../../components/AppWrapper/AppWrapper";
import PostComponent from "../../components/PostComponent/PostComponent";
import {
  Box,
  Stack
} from '@chakra-ui/react'

const samplePostData = [
  {
    timestamp: "12:47 AM · May 25, 2022",
    text: "Doodles are headed to NYC 🍎. June 21-23: Midtown Manhattan. RSVP for Doodles and Dooplicator holders will open next week.",
    author: {
      walletAddress: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
      username: "Evan Keast",
      profilePic: "https://s3-alpha-sig.figma.com/img/a8fa/df5e/3d73d21b956a4ddcdd287a204b4ea1a0?Expires=1655683200&Signature=HU~fkoIdFxhBi0fN3DE0jROXrUgLrrcUANO7LV1MpiSGyHQntrmgUKuDu~tPHvKw2WaDY5cz0rBSg~UsSMzCGpZ4A38v4HF7~IdzHdvjBqgXkx2dDigRhMezfi6DH9p38YHJQnHJOz2eduoMR3vPZJQ4UIPm9uZOjczzZUnCx6O~CVKefcmHb8icodO0PiQcPbTUEsnSKf1U4Pu2dgT-tPqGAcPVKOpLOaa8MfyxYk4T8SfpxPjjZGKA9aeWrSdn-xt385i6xTMhR24XIqKxmc59DGbzS7H5U2Oo-g2xDDAj5YUddpKmrdHMhecdqemp3J1ObEDmp-Uv9svqFB0xhA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      verified: true
    },
    like: "942",
    comment: "50",
    community: "Doodles",
    imageURL: "https://nfte.co/content/images/2021/12/doodlesbanner.jpeg",
    edited: false
  },
  {
    timestamp: "2:43 PM · May 23, 2022",
    text: `I listened to the Doom soundtrack while designing these. Mainly the song "BFG Division". Look at the demon sneaker while listening to it, trust me. You will get the vibe. 👹`,
    author: {
      walletAddress: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
      username: "clegfx",
      profilePic: "https://s3-alpha-sig.figma.com/img/5496/6ae3/dd9c04fcaf22eff661bce1a09756726f?Expires=1655683200&Signature=FsYzI17asOXKTxOs6UOlgMLJqCVksLEq~Ade4-b8R7DE7R7MZ9~8CDUqplj1N-2VgMGq~4vXO4JtsJuUIRBMRW0PtPDfZu3YJHiuYR176-yR8JHC4oNiD4znX8xmYt-mG2jypG7-p8jeBdDCTZ5bImbCJsz3hm3QfRuP0eFFcbLKgzpmoROBPExbolFL4x99QXRkbHRLx4IRfPw1Pu8rCbjGgrUUiH3UCtQx1gUQJh0Gg~PXYVUJQMZWab22Szd~A6SfLD7n6osbH~mmJ1iQIM-IPWmF0PlUz8Hlu6-6nGihAr2jvU8QJD6rOrfn71NDlQGNZlPhUSy4I8saU1zahA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      verified: false
    },
    like: "120",
    comment: "2",
    community: "DEvilSh0es",
    imageURL: "https://s3-alpha-sig.figma.com/img/4a52/9efc/ac9b22129dabcc5fa938049d915eb8dd?Expires=1655683200&Signature=EN23b9hrMsT4brdEavlbENDWWfMSixjuWayZbk1~PIU7Z39OuWLEcNUOz8AWnoCw0-oka8ldkmyiz7NMjQFc2W5jg9fgzHN-nGw~LfzHNbdQ53L6VQjkUGEygFYieT0FEWjtvUJ07me5Nmj2B1Q7GUHHG1eN0-kQxf4uWleH~vCmdFEpT5V-7lgJNb4j-mVmTwXPGUGtD9n7CVMuMPJa9d2Zxz3RsByW2QONfInGVreusO7bBzqP195WPl48vvCp2hqPGhv7HB0uf65C6pX6xvRjAsS5VenEchrF9OBk7luVi0hmxNtUohH2zCoCqpFUrCs-RN-xLjAfFUnq~34nEw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    edited: false
  },
  {
    timestamp: "1:43 PM · May 9, 2022",
    text: "Saw a dragon today. Wow!",
    author: {
      walletAddress: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
      username: "Deadly Dwarf",
      profilePic: "https://www.cheatsheet.com/wp-content/uploads/2016/11/tyrion-tywin-1024x683.jpg",
      verified: true
    },
    like: "4.2k",
    comment: "420",
    community: "GOT",
    imageURL: "https://api.time.com/wp-content/uploads/2016/05/tyrion-game-of-thrones-peter-dinklage.jpeg",
    edited: false
  }
]

const HomePage = () => {
  return (
    <AppWrapper>
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
    </AppWrapper>
  );
}

export default HomePage;
