import {
    Flex,
    Link
} from '@chakra-ui/react';

import { FaCommentAlt } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { AiOutlineRetweet } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs';

import TextButton from '../../Buttons/TextButton/TextButton'
import IconSquareButton from '../../Buttons/IconSquareButton/IconSquareButton';

import PostBotLikeButton from "./PostBotLikeButton/PostBotLikeButton";

const PostBotComponent = ({
    item,
}) => {
    return (
        <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'space-between'}>
            <Flex gap={'10px'}>
                <PostBotLikeButton item={item} />
                <TextButton
                    display={item.comment ? 'inline-flex' : 'none'}
                    text={`${item.comment} Commments`}
                    rightIcon={<FaCommentAlt size="1.1rem" />}
                    onClick={(e) => {
                        // comment
                        console.log("comment")
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
                <IconSquareButton
                    display={item.parent ? 'none' : 'inline-flex'}
                    icon={<AiOutlineRetweet size="1.5rem" />}
                    onClick={(e) => {
                        // retweet
                        console.log("retweet")
                        e.stopPropagation();
                    }} />
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