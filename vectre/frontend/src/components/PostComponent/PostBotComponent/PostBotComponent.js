import {
    Button,
    IconButton,
    Flex,
    Link
} from '@chakra-ui/react';

import { IoIosShareAlt } from 'react-icons/io';
import { FaCommentAlt, FaBookmark } from 'react-icons/fa';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { ReactComponent as LikeIcon } from '../../../assets/icons/like-icon.svg';

const PostBotComponent = ({
    item,
}) => {
    return (
        <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'space-between'}>
            <Flex gap={'10px'}>
                <Button
                    display={'inline-flex'}
                    px={'15px'}
                    py={'6px'}
                    fontSize={'12px'}
                    fontWeight={500}
                    color={'primary.400'}
                    bg={'white'}
                    rightIcon={<LikeIcon />}
                    _focus={{ outline: 0 }}>
                    {item.like} Likes
                </Button>
                <Button
                    display={'inline-flex'}
                    px={'15px'}
                    py={'6px'}
                    fontSize={'12px'}
                    fontWeight={500}
                    color={'primary.400'}
                    bg={'white'}
                    rightIcon={<FaCommentAlt size="0.9rem" />}
                    _focus={{ outline: 0 }}>
                    {item.comment} Commments
                </Button>
                <IconButton
                    display={'inline-flex'}
                    px={'8px'}
                    py={'3px'}
                    color={'primary.400'}
                    bg={'white'}
                    borderRadius={'6px'}
                    alignItems={'center'}
                    icon={<IoIosShareAlt size="1.6rem" />}
                    _focus={{ outline: 0 }}>
                </IconButton>
                <IconButton
                    display={'inline-flex'}
                    px={'8px'}
                    py={'3px'}
                    color={'primary.400'}
                    bg={'white'}
                    borderRadius={'6px'}
                    alignItems={'center'}
                    icon={<FaBookmark size="1.1rem" />}
                    _focus={{ outline: 0 }}>
                </IconButton>
            </Flex>
            <Link
                href={item.community}
                _hover={{ textDecoration: "none" }}>
                <Button
                    display={'inline-flex'}
                    px={'17.5px'}
                    fontSize={'18px'}
                    fontWeight={700}
                    color={'primary.400'}
                    bg={'white'}
                    rightIcon={<BsFillCheckCircleFill />}
                    _focus={{ outline: 0 }}>
                    &lt; {item.community} &gt;
                </Button>
            </Link>
        </Flex>
    );
};

export default PostBotComponent;