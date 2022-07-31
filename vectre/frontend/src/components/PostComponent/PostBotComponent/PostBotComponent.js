import {
    Flex,
    Link
} from '@chakra-ui/react';

import { FaCommentAlt, FaGhost } from 'react-icons/fa';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import TextButton from '../../Buttons/TextButton/TextButton'
import IconSquareButton from '../../Buttons/IconSquareButton/IconSquareButton';

import PostBotLikeButton from "./PostBotLikeButton/PostBotLikeButton";
import PostBotRepostButton from "./PostBotRepostButton/PostBotRepostButton";

const PostBotComponent = ({
    item,
    fromFeed = false,
    fromSearch = false,
}) => {
    return (
        <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'space-between'}>
            <Flex gap={'10px'}>
                <PostBotLikeButton item={item} fromFeed={fromFeed} fromSearch={fromSearch} />
                <TextButton
                    display={item.comment && !item.parent ? 'inline-flex' : 'none'}
                    text={`${item.comment} Commments`}
                    rightIcon={<FaCommentAlt size="1.1rem" />}
                    onClick={(e) => {
                        window.location = `/post/${item.postID}#comments`
                        e.stopPropagation();
                    }} />
                <IconSquareButton
                    display={item.author.walletAddress === "0x15f209074682937c58ca031ebb43d64fa98d97b8" ? 'inline-flex' : 'none'}
                    icon={<FaGhost size="1.2rem" />}
                    onClick={(e) => {
                        e.stopPropagation();
                    }} />
                <PostBotRepostButton item={item} />
            </Flex>
            <Link
                display={item.parent ? 'none' : 'inline-flex'}
                href={item.community ? `/c/${item.community}` : `/user/${item.author.walletAddress}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                _hover={{ textDecoration: "none" }}>
                <TextButton
                    text={item.community ? `< ${item.community} >` : `@${item.author.username}`}
                    px={'17.5px'}
                    fontSize={'18px'}
                    fontWeight={700}
                    rightIcon={<BsFillCheckCircleFill />} />
            </Link>
        </Flex >
    );
};

export default PostBotComponent;