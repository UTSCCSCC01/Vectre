import {
    Box,
    Textarea,
    Button,
    FormControl,
    Stack,
    useToast
} from '@chakra-ui/react';
import { createComment } from "../../../redux/actions/posts";
import { useDispatch, useSelector } from 'react-redux';
import { loggedInUserSelector } from '../../../redux/selectors/users';
import { useParams } from "react-router-dom";

const UserCommentBotComponent = ({
    item,
}) => {
    const loggedInUser = useSelector(loggedInUserSelector);
    const dispatch = useDispatch();
    const { postID } = useParams();

    return (
        <>
            <Stack
                display={'flex'}
                flexDirection={'row'}
                alignItems={'center'}
                gap={'20px'}>
                <Box
                    width={'100%'}>
                    <form
                        id="user-comment-form"
                        onSubmit={((event) => {
                            event.preventDefault();
                            let newComment = {
                                author: loggedInUser.walletAddress,
                                text: event.target.comment.value
                            }
                            dispatch(createComment(postID, newComment, () => { document.getElementById("user-comment-form").reset() }));
                        })}
                    >
                        <FormControl>
                            <Textarea
                                id='comment'
                                placeholder={'thoughts?'}
                                fontSize={'18px'}
                                bg={'rgba(255, 255, 255, 0.78)'}
                                border={'none'}
                                resize={'none'}
                                size={'md'}
                                minHeight={'60px'}
                                _placeholder={{ fontWeight: '700', color: 'sub.400' }} />
                        </FormControl>
                    </form>
                </Box>
                <Button
                    type={"submit"}
                    form={"user-comment-form"}
                    background={'primary.400'}
                    color={'white'}
                    px={'46px'}
                    py={'11px'}
                    borderRadius={'6px'}
                    _focus={{ outline: 0 }}>
                    Comment
                </Button>
            </Stack>
        </>
    );
};

export default UserCommentBotComponent;