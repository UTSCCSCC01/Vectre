import {
    Stack,
    Box,
    useDisclosure
} from '@chakra-ui/react';

import PostTopComponent from './PostTopComponent/PostTopComponent';
import PostMidComponent from './PostMidComponent/PostMidComponent';
import PostBotComponent from './PostBotComponent/PostBotComponent';
import PostModalComponent from './PostModalComponent/PostModalComponent';

const PostComponent = ({
    item,
    ...otherProps
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Box
                height={'fit-content'}
                bg={item.isComment ? 'rgba(59, 130, 246, 0.16)' : 'rgba(255, 255, 255, 0.5)'}
                border={item.isComment ? '1px solid rgba(59, 130, 246, 0.16)' : '1px solid rgba(255, 255, 255, 0.5)'}
                transition={'all .15s ease-in-out'}
                borderRadius={'6px'}
                px={'18px'}
                py={'15px'}
                _hover={{ border: "1px solid rgba(59, 130, 246, 0.4)" }}
                cursor={window.location.toString().includes('home') ? 'pointer' : 'default'}
                onClick={(() => {
                    if (item.postId && !item.isComment && window.location.toString().includes('home')) window.location = `/post/${item.postId}`;
                })}>
                <Stack gap={'4px'}>
                    <PostTopComponent item={item} />
                    <PostMidComponent item={item} onOpen={onOpen} />
                    <PostBotComponent item={item} />
                </Stack>
                {otherProps.children}
            </Box>
            <PostModalComponent isOpen={isOpen} onClose={onClose} imageURL={item.imageURL} />
        </>
    );
};

export default PostComponent;