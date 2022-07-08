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
    fromFeed=false,
    ...otherProps
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const isPostClickable = item.postID && window.location.toString().includes('home')
    return (
        <>
            <Box
                height={'fit-content'}
                bg={item.parent ? 'rgba(59, 130, 246, 0.16)' : 'rgba(255, 255, 255, 0.5)'}
                border={item.parent ? '1px solid rgba(59, 130, 246, 0.16)' : '1px solid rgba(255, 255, 255, 0.5)'}
                transition={'all .15s ease-in-out'}
                borderRadius={'6px'}
                px={'18px'}
                py={'15px'}
                _hover={isPostClickable ? { border: "1px solid rgba(59, 130, 246, 0.4)" } : ""}
                cursor={isPostClickable ? 'pointer' : 'default'}
                onClick={() => { if (isPostClickable) window.location = `/post/${item.postID}`}}>
                <Stack gap={'4px'}>
                    <PostTopComponent item={item} />
                    <PostMidComponent item={item} onOpen={onOpen} />
                    <PostBotComponent item={item} fromFeed={fromFeed}/>
                </Stack>
                {otherProps.children}
            </Box>
            <PostModalComponent isOpen={isOpen} onClose={onClose} imageURL={item.imageURL} />
        </>
    );
};

export default PostComponent;