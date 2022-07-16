import {
    Stack,
    Box
} from '@chakra-ui/react';

import PostTopComponent from '../PostComponent/PostTopComponent/PostTopComponent';
import UserCommentBotComponent from './UserCommentBotComponent/UserCommentBotComponent';

const UserCommentComponent = ({
    item,
    isComment
}) => {
    return (
        <>
            <Box
                height={'fit-content'}
                bg={'rgba(255, 255, 255, 0.5)'}
                borderRadius={'6px'}
                mt={'0px !important'}
                px={'18px'}
                py={'15px'}>
                <Stack gap={'4px'}>
                    <PostTopComponent item={item} />
                    <UserCommentBotComponent item={item} isComment={isComment} />
                </Stack>
            </Box>
        </>
    );
};

export default UserCommentComponent;