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
import { postSelector, commentsSelector } from "../../redux/selectors/posts";
import { getLoggedInUser } from "../../redux/actions/users";
import { getPost, getComments } from "../../redux/actions/posts";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

const PostPage = () => {
    const loggedInUser = useSelector(loggedInUserSelector);
    const post = useSelector(postSelector);
    const comments = useSelector(commentsSelector);
    const dispatch = useDispatch();
    const { postID } = useParams();

    useEffect(() => {
        dispatch(getLoggedInUser());
        dispatch(getPost(postID));
        dispatch(getComments(postID));
    }, [])

    return (
        <AppWrapper>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <Stack alignSelf={'center'} gap={'16px'}>
                    {
                        // checks if post.author is defined first
                        post.author !== undefined ? (
                            <>
                                <PostComponent item={post} />
                                {loggedInUser.walletAddress ? (<UserCommentComponent item={{ author: loggedInUser }} />) : (<UserCommentNotLoggedInComponent />)}
                                {/* Add Comments below */}
                                {
                                    comments !== undefined ?
                                        comments.map((item, i) => {
                                            return (
                                                <Box key={i} mt={item.parent ? "0 !important" : "initial"}>
                                                    <PostComponent item={item} />
                                                </Box>
                                            )
                                        })
                                        : (
                                            <div>No Comments? 🤔 </div>
                                        )
                                }
                            </>
                        ) : (
                            <Box>The post with postID {postID} does not exist.</Box>
                        )
                    }
                </Stack>
            </Box>
        </AppWrapper>
    );
}

export default PostPage;