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
    postId: "00001",
    like: "942",
    comment: "50",
    community: "Doodles",
    imageURL: "https://pbs.twimg.com/media/FTSfCnTXoAEyhOp?format=jpg&name=small",
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
            profilePic: "https://img.seadn.io/files/ed6633d0685d1ad5b2aa13d5d36c1149.png?fit=max&w=600",
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
            profilePic: "https://cdn-612d39b2c1ac189e9851cc81.closte.com/wp-content/uploads/2022/01/Generous-Robots-2-360x360.jpg",
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