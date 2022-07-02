import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
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
      profilePic: "https://media-exp1.licdn.com/dms/image/C5603AQFr-8Qlf9kXdw/profile-displayphoto-shrink_200_200/0/1641631597302?e=1655942400&v=beta&t=wrB9-3aglTbvD9K2AZ6pd7pk3JreaD6kZVdw-SdEABY",
      verified: true
    },
    postId: "00001",
    likes: "942",
    comment: "50",
    community: "Doodles",
    imageURL: "https://pbs.twimg.com/media/FTSfCnTXoAEyhOp?format=jpg&name=small",
    edited: false
  },
  {
    timestamp: "2:43 PM · May 23, 2022",
    text: `I listened to the Doom soundtrack while designing these. Mainly the song "BFG Division". Look at the demon sneaker while listening to it, trust me. You will get the vibe. 👹`,
    author: {
      walletAddress: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
      username: "clegfx",
      profilePic: "https://img.seadn.io/files/ed6633d0685d1ad5b2aa13d5d36c1149.png?fit=max&w=600",
      verified: false
    },
    postId: "00002",
    likes: "120",
    comment: "2",
    community: "DEvilSh0es",
    imageURL: "https://img.businessoffashion.com/resizer/26N-gpJby-rUwge6lNFDShJpi4k=/arc-photo-businessoffashion/eu-central-1-prod/public/WWEPZDRDRNGXVNWWY2RB722GPE.png",
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
    postId: "00003",
    likes: "4.2k",
    comment: "420",
    community: "GOT",
    imageURL: "https://api.time.com/wp-content/uploads/2016/05/tyrion-game-of-thrones-peter-dinklage.jpeg",
    edited: false
  },
  {
    timestamp: "12:20 PM · May 1, 2022",
    text: "uwu",
    author: {
      walletAddress: "0x88a6be0f6b921edfcc5211dc716a397e141631a6",
      username: "Not Deadly Dwarf",
      profilePic: "https://nextshark.com/wp-content/uploads/2020/07/2skdghdlaiwjkaugsf.jpg",
      verified: true
    },
    likes: "30.2m",
    comment: "43k",
    community: "Meowz",
    isRepost: true,
    repostData: {
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
    },
    edited: false
  }
]

const HomePage = () => {
  return (
    <ContentWIthNavContainer>
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
    </ContentWIthNavContainer>
  );
}

export default HomePage;
