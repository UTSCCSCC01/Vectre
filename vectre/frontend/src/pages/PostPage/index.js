import AppWrapper from "../../components/AppWrapper/AppWrapper";
import PostComponent from "../../components/PostComponent/PostComponent";
import UserCommentComponent from "../../components/UserCommentComponent/UserCommentComponent";

import {
    Box,
    Stack
} from '@chakra-ui/react'

const samplePostData = {
    timestamp: "12:47 AM · May 25, 2022",
    text: "Doodles are headed to NYC 🍎. June 21-23: Midtown Manhattan. RSVP for Doodles and Dooplicator holders will open next week.",
    author: {
        walletAddress: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
        username: "Evan Keast",
        profilePic: "https://media-exp1.licdn.com/dms/image/C5603AQFr-8Qlf9kXdw/profile-displayphoto-shrink_200_200/0/1641631597302?e=1655942400&v=beta&t=wrB9-3aglTbvD9K2AZ6pd7pk3JreaD6kZVdw-SdEABY",
        verified: true
    },
    like: "942",
    comment: "50",
    community: "Doodles",
    imageURL: "https://nfte.co/content/images/2021/12/doodlesbanner.jpeg",
    edited: false
}

const userData = {
    author: {
        walletAddress: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
        username: "Evan Keast",
        profilePic: "https://media-exp1.licdn.com/dms/image/C5603AQFr-8Qlf9kXdw/profile-displayphoto-shrink_200_200/0/1641631597302?e=1655942400&v=beta&t=wrB9-3aglTbvD9K2AZ6pd7pk3JreaD6kZVdw-SdEABY",
        verified: true
    }
}

const sampleCommentData = [
    {
        timestamp: "2:43 PM · May 26, 2022",
        text: "I listened to the Doom soundtrack while designing these. Mainly the song “BFG Division”. Look at the demon sneaker while listening to it, trust me. You will get the vibe. 👹",
        author: {
            walletAddress: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
            username: "Jonathan",
            profilePic: "https://s3-alpha-sig.figma.com/img/794b/9ec3/94c9151441e7bc922fc1c4b0226e61b5?Expires=1656288000&Signature=U6qE-vlSykuil6iHLBVI9IYKVmC-1n-3eoALoy7knD6PqWKRSi5R24ZeV~~TY0c-U-DxazRImFc95GiuwmL~4PxjpE6yZAO0hLjx20230027MOAYGLppWPgdzaWUwz5JLL1whvnDfWwEMGRiTl0mNmcjAYhDDAhxPXgQ2qfkYsEINXVw4D5Rc2w80AX-gH1PkoYQ6KOG6qkiRb4vh4VBMHDC-t5LYkkdnxgCm7XGT-ovXLFyFm1jf-QaTYYV-xdSncJC3uX1c~vcWtnDJFU39HriKUzIHDx70vA-UpXdbpnGH~jX~PFM3AcC-8EZ-zSujfStH91ne-Vg6oJCWFnAaw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            verified: true
        },
        like: "421",
        isComment: true,
        comment: null,
        community: null,
        imageURL: null,
        edited: false
    },
    {
        timestamp: "4:32 PM · May 26, 2022",
        text: "Beep Boop I'm a robot!",
        author: {
            walletAddress: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
            username: "brandon",
            profilePic: "https://s3-alpha-sig.figma.com/img/2636/8bea/fa2a6fe4ca37b1cc10914e212aa8092d?Expires=1656288000&Signature=VLCInM3~4GPjUHew5UcRlDcUlnqAkzCUjOx0SgDSZzldFQeOo3TF5HO2lMN8nTWAOytJ7E9nA~vSzp7dfIiq2EmcxujGQbNZ-8PUEMweG1gjgpRVkfu7mB~cJz1HMQC~ytZ7WWs86z~Wy9E5FqqZGSmYmVCe~uo1SWdmlJDiRl9SZxYh1POss2asScWjdEPXUoZSuyUxYRwIAKQrCdwr9g6DaFkYv~H5Pb~2dIEnV9bYUIv4CHITrHZNt5qbNO26z8kIgJrTlbvSgC5XVvkjBcRqqFMKeMbP-bg7Tekp4LId2H3wd-jICtMVBMXnY46gL6bMZdzBmwX91ThBPV4apg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
            verified: false
        },
        like: "32",
        isComment: true,
        comment: null,
        community: null,
        imageURL: null,
        edited: false
    },
]

const PostPage = () => {
    const isLogged = true;
    return (
        <AppWrapper>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <Stack alignSelf={'center'} gap={'16px'}>
                    <PostComponent item={samplePostData} />
                    {
                        isLogged ? (<UserCommentComponent item={userData} />) : (<Box>User is not logged in</Box>)
                    }
                    {/* Add Comments below */}
                    {
                        sampleCommentData.map((item, i) => {
                            return (
                                <Box key={i} mt={item.isComment ? "0 !important" : "initial"}>
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

export default PostPage;