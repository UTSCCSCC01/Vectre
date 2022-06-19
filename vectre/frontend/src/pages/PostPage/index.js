import AppWrapper from "../../components/AppWrapper/AppWrapper";
import PostComponent from "../../components/PostComponent/PostComponent";

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
        profilePic: "https://s3-alpha-sig.figma.com/img/a8fa/df5e/3d73d21b956a4ddcdd287a204b4ea1a0?Expires=1655683200&Signature=HU~fkoIdFxhBi0fN3DE0jROXrUgLrrcUANO7LV1MpiSGyHQntrmgUKuDu~tPHvKw2WaDY5cz0rBSg~UsSMzCGpZ4A38v4HF7~IdzHdvjBqgXkx2dDigRhMezfi6DH9p38YHJQnHJOz2eduoMR3vPZJQ4UIPm9uZOjczzZUnCx6O~CVKefcmHb8icodO0PiQcPbTUEsnSKf1U4Pu2dgT-tPqGAcPVKOpLOaa8MfyxYk4T8SfpxPjjZGKA9aeWrSdn-xt385i6xTMhR24XIqKxmc59DGbzS7H5U2Oo-g2xDDAj5YUddpKmrdHMhecdqemp3J1ObEDmp-Uv9svqFB0xhA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
        verified: true
    },
    like: "942",
    comment: "50",
    community: "Doodles",
    imageURL: "https://s3-alpha-sig.figma.com/img/8480/cbbd/2c3b477fd04e371685a1a428f77036c0?Expires=1655683200&Signature=XtRJtUk4kxmfht0yVjTZqaTt~0BqjWEwYsPa6VF0yw2X7krernxjkWP5Zp~fRdkBVIgydMJ1snfY8xAuXCoMogiQWG0cOF88eypSMEn9Mgm9FKhHvzVFGKffnTLiKJY3WhafIh2E5wMRan61TIkb14uut2u5OINSmUNJNVRmO0S1vgEVz~LS~ynNa8s8t7bIrTa3c327HqtKeAx7LSox8I4cJs94MD8XeoDl8FRLgGWQSyE4yZFfGHyMuGj7BbXMX84zFnNgYh5sG-4oJ5xZKY98MUpHhyikzcUXaE6rDFot9SDx68ohBWc6o20o6dwKbvw6LcdYODFmg9KA0XyrFg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    edited: false
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
    return (
        <AppWrapper>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <Stack alignSelf={'center'} gap={'16px'}>
                    <Box>
                        <PostComponent item={samplePostData} />
                    </Box>
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