import {
    Stack,
    Box
} from '@chakra-ui/react';

import PostTopComponent from './PostTopComponent/PostTopComponent';
import PostMidComponent from './PostMidComponent/PostMidComponent';
import PostBotComponent from './PostBotComponent/PostBotComponent';

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
                <PostTopComponent item={item} />
                <PostMidComponent item={item} />
                <PostBotComponent item={item} />
            </Stack>
            {otherProps.children}
        </Box>
    );
};

export default PostComponent;