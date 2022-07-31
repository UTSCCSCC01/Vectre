import {
    Stack,
    Box,
    useDisclosure
} from '@chakra-ui/react';

import PostTopComponent from '../PostTopComponent/PostTopComponent';
import PostMidComponent from '../PostMidComponent/PostMidComponent';
import PostModalComponent from '../PostModalComponent/PostModalComponent';

const RepostComponent = ({
    item
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Box
                height={'fit-content'}
                bg={'rgba(198, 219, 255, 0.44)'}
                border={'3px solid #C6DBFF'}
                borderRadius={'6px'}
                px={'18px'}
                py={'15px'}
                cursor={'pointer'}
                onClick={((e) => {
                    window.location = `/post/${item.postID}`;
                    e.stopPropagation();
                })}>
                <Stack gap={'4px'}>
                    <PostTopComponent item={item} fromRepost={true} />
                    <PostMidComponent item={item} onOpen={onOpen} />
                </Stack>
            </Box>
            <PostModalComponent isOpen={isOpen} onClose={onClose} imageURL={item.imageURL} />
        </>
    );
};

export default RepostComponent;