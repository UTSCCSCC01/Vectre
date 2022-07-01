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
}) => {
    const loggedInUser = useSelector(loggedInUserSelector);
    const dispatch = useDispatch();
    const [likeToggle, setLikeToggle] = useBoolean(item.alreadyLiked);

    return (
        <>
            <TextButton
                display={item.likes || item.likes === 0 ? 'inline-flex' : 'none'}
                text={`${formatLikes(item.likes)} Likes`}
                bg={likeToggle ? 'primary.400' : 'white'}
                color={likeToggle ? 'white' : 'primary.400'}
                _hover={{}}
                _active={{}}
                rightIcon={likeToggle ? <RiHeart2Fill size={'1.2rem'} /> : <RiHeart2Line size={'1.2rem'} />}
                onClick={(e) => {
                    if (Object.keys(loggedInUser).length !== 0) {
                        if (likeToggle) {
                            dispatch(postUnlike(item.postID, { walletAddress: loggedInUser.walletAddress }, Boolean(item.parent), () => { setLikeToggle.toggle() }));
                        }
                        else {
                            dispatch(postLike(item.postID, { walletAddress: loggedInUser.walletAddress }, Boolean(item.parent), () => { setLikeToggle.toggle() }));
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