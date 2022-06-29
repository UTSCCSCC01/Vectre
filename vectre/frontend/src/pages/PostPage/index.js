import AppWrapper from "../../components/AppWrapper/AppWrapper";
import PostComponent from "../../components/PostComponent/PostComponent";
import UserCommentComponent from "../../components/UserCommentComponent/UserCommentComponent";
import UserCommentNotLoggedInComponent from "../../components/UserCommentComponent/UserCommentNotLoggedInComponent";

import {
    Box,
    Stack
} from '@chakra-ui/react'

import React, { useEffect } from 'react'
import { loggedInUserSelector } from "../../redux/selectors/users";
import { commentsSelector } from "../../redux/selectors/posts";
import { getLoggedInUser } from "../../redux/actions/users";
import { getComments } from "../../redux/actions/posts";
import { useDispatch, useSelector } from 'react-redux';

const samplePostData = {
    timestamp: "12:47 AM · May 25, 2022",
    text: "Doodles are headed to NYC 🍎. June 21-23: Midtown Manhattan. RSVP for Doodles and Dooplicator holders will open next week.",
    author: {
        walletAddress: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
        username: "Evan Keast",
        profilePic: "https://ipfs.io/ipfs/QmS2qSssG5M8dBzaqeCcWibULXoddeDFH1dNyvhaMszcd9",
        verified: true
    },
    postId: "00001",
    like: "942",
    comment: "50",
    community: "Doodles",
    imageURL: "https://pbs.twimg.com/media/FTSfCnTXoAEyhOp?format=jpg&name=small",
    edited: false
}

const PostPage = () => {
    const loggedInUser = useSelector(loggedInUserSelector);
    const comments = useSelector(commentsSelector);
    const dispatch = useDispatch();

    const currentPostID = "00001";

    useEffect(() => {
        dispatch(getLoggedInUser());
        dispatch(getComments(currentPostID));
    }, [])

    return (
        <AppWrapper>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <Stack alignSelf={'center'} gap={'16px'}>
                    {console.log(comments)}
                    <PostComponent item={samplePostData} />
                    {
                        loggedInUser.walletAddress ? (<UserCommentComponent item={{ author: loggedInUser }} />) : (<UserCommentNotLoggedInComponent />)
                    }
                    {/* Add Comments below */}
                    {
                        comments.map((item, i) => {
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