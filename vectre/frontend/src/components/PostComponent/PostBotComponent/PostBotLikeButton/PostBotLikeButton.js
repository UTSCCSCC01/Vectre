import {
    useBoolean
} from '@chakra-ui/react';

import { ReactComponent as LikeIcon } from '../../../../assets/icons/like-icon.svg';

import TextButton from '../../../Buttons/TextButton/TextButton'
import { formatLikes } from '../../../../utils/Utils';

// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInUserSelector } from '../../../../redux/selectors/users';
import { postLike, postUnlike } from "../../../../redux/actions/posts";

const PostBotLikeButton = ({
    item,
}) => {
    const loggedInUser = useSelector(loggedInUserSelector);
    const dispatch = useDispatch();
    const [likeToggle, setLikeToggle] = useBoolean() //setLikeToggle.toggle()
    // const [likes, setLikes] = useState(item.likes);

    return (
        <>
            <TextButton
                display={item.likes || item.likes === 0 ? 'inline-flex' : 'none'}
                bg={likeToggle ? 'red' : 'white'}
                text={`${formatLikes(item.likes)} Likes`}
                rightIcon={<LikeIcon />}
                onClick={(e) => {
                    // like
                    if (likeToggle) {
                        dispatch(postUnlike(item.postID, { walletAddress: loggedInUser.walletAddress }, Boolean(item.parent), () => { setLikeToggle.toggle() }));
                    }
                    else {
                        dispatch(postLike(item.postID, { walletAddress: loggedInUser.walletAddress }, Boolean(item.parent), () => { setLikeToggle.toggle() }));
                    }
                    e.stopPropagation();
                }} />
        </>
    );
};

export default PostBotLikeButton;