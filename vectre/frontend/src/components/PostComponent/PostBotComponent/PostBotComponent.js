import {
    Flex,
    Link
} from '@chakra-ui/react';

import { FaCommentAlt } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import TextButton from '../../Buttons/TextButton/TextButton'
import IconSquareButton from '../../Buttons/IconSquareButton/IconSquareButton';

import PostBotLikeButton from "./PostBotLikeButton/PostBotLikeButton";
import PostBotRepostButton from "./PostBotRepostButton/PostBotRepostButton";

const PostBotComponent = ({
    item,
    fromFeed=false
}) => {
    return (
        <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'space-between'}>
            <Flex gap={'10px'}>
                <PostBotLikeButton item={item} fromFeed={fromFeed}/>
                <TextButton
                    display={item.comment ? 'inline-flex' : 'none'}
                    text={`${item.comment} Commments`}
                    rightIcon={<FaCommentAlt size="1.1rem" />}
                    onClick={(e) => {
                        window.location = `/post/${item.postID}#comments`
                        e.stopPropagation();
                    }} />
                <IconSquareButton
                    display={item.parent ? 'none' : 'inline-flex'}
                    icon={<FiShare2 size="1.2rem" />}
                    onClick={(e) => {
                        // share
                        console.log("share")
                        e.stopPropagation();
                    }} />
                <PostBotRepostButton item={item} />
            </Flex>
            <Link
                display={item.parent ? 'none' : 'inline-flex'}
                href={`/c/${item.community}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                _hover={{ textDecoration: "none" }}>
                <TextButton
                    text={`< ${item.community} >`}
                    px={'17.5px'}
                    fontSize={'18px'}
                    fontWeight={700}
                    rightIcon={<BsFillCheckCircleFill />} />
            </Link>
        </Flex >
    );
};

export default PostBotComponent;