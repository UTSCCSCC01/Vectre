import {
    Stack,
    Box
} from '@chakra-ui/react'

import PostComponent from '../../PostComponent/PostComponent'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { profilePostsSelector } from '../../../redux/selectors/posts';
import { getProfilePosts } from "../../../redux/actions/posts";

const ProfilePosts = ({
    props
}) => {
    const posts = useSelector(profilePostsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfilePosts(props.profileWalletAddress))
    }, []);

    return (
        <>
            <Stack
                mt={'30px'}
                gap={'10px'}>
                {
                    posts ?
                        posts.map((post, i) => {
                            return (
                                <PostComponent key={i} item={post} />
                            )
                        })
                        :
                        <Box>No posts</Box>
                }
            </Stack>
        </>
    )
}

export default ProfilePosts;