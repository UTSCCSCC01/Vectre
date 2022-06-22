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
                bg={'rgba(255, 255, 255, 0.5)'}
                borderRadius={'6px'}
                px={'18px'}
                py={'15px'}>
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