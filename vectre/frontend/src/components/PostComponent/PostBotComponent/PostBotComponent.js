import {
    Flex,
    Link
} from '@chakra-ui/react';

import { IoIosShareAlt } from 'react-icons/io';
import { FaCommentAlt, FaBookmark } from 'react-icons/fa';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { ReactComponent as LikeIcon } from '../../../assets/icons/like-icon.svg';

import TextButton from '../../Buttons/TextButton/TextButton'
import IconSquareButton from '../../Buttons/IconSquareButton/IconSquareButton';

const PostBotComponent = ({
    item,
}) => {
    return (
        <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'space-between'}>
            <Flex gap={'10px'}>
                <TextButton
                    display={item.like ? 'inline-flex' : 'none'}
                    text={`${item.like} Likes`}
                    rightIcon={<LikeIcon />}
                    onClick={(e) => {
                        // like
                        console.log("Like")
                        e.stopPropagation();
                    }} />
                <TextButton
                    display={item.comment ? 'inline-flex' : 'none'}
                    text={`${item.comment} Commments`}
                    rightIcon={<FaCommentAlt size="0.9rem" />}
                    onClick={(e) => {
                        // comment
                        console.log("comment")
                        e.stopPropagation();
                    }} />
                <IconSquareButton
                    display={item.isComment ? 'none' : 'inline-flex'}
                    icon={<IoIosShareAlt size="1.6rem" />}
                    onClick={(e) => {
                        // share
                        console.log("share")
                        e.stopPropagation();
                    }} />
                <IconSquareButton
                    display={item.isComment ? 'none' : 'inline-flex'}
                    icon={<FaBookmark size="1.1rem" />}
                    onClick={(e) => {
                        // bookmark
                        console.log("bookmark")
                        e.stopPropagation();
                    }} />
            </Flex>
            <Link
                display={item.isComment ? 'none' : 'inline-flex'}
                href={`c/${item.community}`}
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