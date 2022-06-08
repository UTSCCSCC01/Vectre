import {
    Stack,
    Box,
    Text,
    Button,
    IconButton,
    Flex,
    Image
} from '@chakra-ui/react';

import { IoIosShareAlt } from 'react-icons/io';
import { FaCommentAlt, FaBookmark } from 'react-icons/fa';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { ReactComponent as LikeIcon } from '../../assets/icons/like-icon.svg';
import { ReactComponent as VerifiedIcon } from '../../assets/icons/verified-icon.svg';

const comment_count = 50;
const like_count = 942;

const PostComponent = ({
    item,
    ...otherProps
}) => {
    return (
        <Box
            height={'fit-content'}
            bg={'rgba(255, 255, 255, 0.5)'}
            borderRadius={'6px'}
            px={'18px'}
            py={'15px'}>
            <Stack gap={'4px'}>
                <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'space-between'}>
                    <Flex gap={'10px'}>
                        <Button
                            display={{ base: 'none', lg: 'inline-flex' }}
                            px={'17.5px'}
                            fontSize={'18px'}
                            fontWeight={700}
                            color={'primary.400'}
                            bg={'white'}
                            // leftIcon={<img />}
                            _focus={{ outline: 0 }}>
                            Evan Keast
                        </Button>
                        <Box
                            display={{ base: 'none', lg: 'inline-flex' }}
                            px={'8px'}
                            py={'3px'}
                            fontSize={'18px'}
                            fontWeight={700}
                            color={'rgb(242,172,88)'}
                            bg={'white'}
                            borderRadius={'6px'}
                            alignItems={'center'}>
                            <VerifiedIcon size="1.5rem" />
                        </Box>
                    </Flex>
                    <Box
                        display={{ base: 'none', lg: 'inline-flex' }}
                        px={'17.5px'}
                        fontSize={'12px'}
                        fontWeight={500}
                        color={'primary.400'}
                        bg={'white'}
                        borderRadius={'6px'}
                        alignItems={'center'}>
                        {item.timestamp}
                    </Box>
                </Flex>
                <Flex
                    display={{ base: 'none', lg: 'inline-flex' }}
                    px={'13px'}
                    py={'11px'}
                    fontSize={'18px'}
                    fontWeight={700}
                    color={'brand.400'}
                    bg={'rgba(255, 255, 255, 0.7)'}
                    borderRadius={'6px'}
                    alignItems={'center'}>
                    {item.text}
                </Flex>
                <Stack>
                    <Image
                        src={item.imageURL}
                        fit={'cover'}
                        overflow={'hidden'}
                        borderRadius={'6px'}
                        height={'250px'} />
                </Stack>
                <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'space-between'}>
                    <Flex gap={'10px'}>
                        <Button
                            display={{ base: 'none', lg: 'inline-flex' }}
                            px={'15px'}
                            py={'6px'}
                            fontSize={'12px'}
                            fontWeight={500}
                            color={'primary.400'}
                            bg={'white'}
                            rightIcon={<LikeIcon />}
                            _focus={{ outline: 0 }}>
                            {like_count} Likes
                        </Button>
                        <Button
                            display={{ base: 'none', lg: 'inline-flex' }}
                            px={'15px'}
                            py={'6px'}
                            fontSize={'12px'}
                            fontWeight={500}
                            color={'primary.400'}
                            bg={'white'}
                            rightIcon={<FaCommentAlt size="0.9rem" />}
                            _focus={{ outline: 0 }}>
                            {comment_count} Commments
                        </Button>
                        <IconButton
                            display={{ base: 'none', lg: 'inline-flex' }}
                            px={'8px'}
                            py={'3px'}
                            color={'primary.400'}
                            bg={'white'}
                            borderRadius={'6px'}
                            alignItems={'center'}
                            icon={<IoIosShareAlt size="1.6rem" />}>
                        </IconButton>
                        <IconButton
                            display={{ base: 'none', lg: 'inline-flex' }}
                            px={'8px'}
                            py={'3px'}
                            color={'primary.400'}
                            bg={'white'}
                            borderRadius={'6px'}
                            alignItems={'center'}
                            icon={<FaBookmark size="1.1rem" />}>
                        </IconButton>
                    </Flex>
                    <Button
                        display={{ base: 'none', lg: 'inline-flex' }}
                        px={'17.5px'}
                        fontSize={'18px'}
                        fontWeight={700}
                        color={'primary.400'}
                        bg={'white'}
                        rightIcon={<BsFillCheckCircleFill />}
                        _focus={{ outline: 0 }}>
                        &lt; Doodles &gt;
                    </Button>
                </Flex>
            </Stack>
            {otherProps.children}
        </Box>
    );
};

export default PostComponent;