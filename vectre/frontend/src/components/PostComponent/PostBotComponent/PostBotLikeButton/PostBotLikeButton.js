import {
    useBoolean
} from '@chakra-ui/react';

import { RiHeart2Line, RiHeart2Fill } from 'react-icons/ri'

import TextButton from '../../../Buttons/TextButton/TextButton'
import { formatLikes } from '../../../../utils/Utils';

import { useDispatch, useSelector } from 'react-redux';
import { loggedInUserSelector } from '../../../../redux/selectors/users';
import { postLike, postUnlike } from "../../../../redux/actions/posts";

const PostBotLikeButton = ({
    item,
    fromFeed = false,
    fromSearch = false,
}) => {
    const loggedInUser = useSelector(loggedInUserSelector);
    const dispatch = useDispatch();

    return (
        <>
            <TextButton
                display={item.likes || item.likes === 0 ? 'inline-flex' : 'none'}
                text={`${formatLikes(item.likes)} Likes`}
                bg={item.alreadyLiked ? 'primary.400' : 'white'}
                color={item.alreadyLiked ? 'white' : 'primary.400'}
                _hover={{}}
                _active={{}}
                rightIcon={item.alreadyLiked ? <RiHeart2Fill size={'1.2rem'} /> : <RiHeart2Line size={'1.2rem'} />}
                onClick={(e) => {
                    if (Object.keys(loggedInUser).length !== 0) {
                        if (item.alreadyLiked) {
                            dispatch(postUnlike(item.postID, Boolean(item.parent), fromFeed, fromSearch));
                        } else {
                            dispatch(postLike(item.postID, Boolean(item.parent), fromFeed, fromSearch));
                        }
                    } else {
                        console.log("Not logged in!");
                    }
                    e.stopPropagation();
                }} />
        </>
    );
};

export default PostBotLikeButton;