import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import PostComponent from "../../components/PostComponent/PostComponent";
import UserCommentComponent from "../../components/UserCommentComponent/UserCommentComponent";
import UserCommentNotLoggedInComponent from "../../components/UserCommentComponent/UserCommentNotLoggedInComponent";
import PostCommentsComponent from "../../components/PostCommentsComponent/PostCommentsComponent";

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

    if (post[0].parent) window.location = `/post/${post[0].parent}#${post[0].postID}`

    return (
        <ContentWIthNavContainer>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <Stack alignSelf={'center'} gap={'16px'}>
                    {(post.length !== 0 && post[0].author && !post[0].parent) ?
                        <>
                            <PostComponent item={post[0]} />
                            {loggedInUser.walletAddress ?
                                <UserCommentComponent
                                    item={{ author: loggedInUser }}
                                    isComment={post[0].parent !== null} />
                            : <UserCommentNotLoggedInComponent /> }
                            <div id="comments"></div>
                            <PostCommentsComponent comments={comments} />
                        </>
                        : <Box>Post does not exist!</Box>
                    }
                </Stack>
            </Box>
        </ContentWIthNavContainer>
    );
}

export default PostPage;