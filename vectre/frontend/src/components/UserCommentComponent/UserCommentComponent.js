import {
    Stack,
    Box
} from '@chakra-ui/react';

import PostTopComponent from '../PostComponent/PostTopComponent/PostTopComponent';
import UserCommentBotComponent from './UserCommentBotComponent/UserCommentBotComponent';

const UserCommentComponent = ({
    item,
}) => {
    return (
        <>
            <Box
                height={'fit-content'}
                bg={item.isComment ? 'rgba(59, 130, 246, 0.16)' : 'rgba(255, 255, 255, 0.5)'}
                borderRadius={'6px'}
                mt={'0px !important'}
                px={'18px'}
                py={'15px'}>
                <Stack gap={'4px'}>
                    <PostTopComponent item={item} />
                    <UserCommentBotComponent item={item} />
                </Stack>
            </Box>
        </>
    );
};

export default UserCommentComponent;