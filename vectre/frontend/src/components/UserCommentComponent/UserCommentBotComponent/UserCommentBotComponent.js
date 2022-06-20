import {
    Box,
    Flex,
    Textarea,
    Button,
    FormControl,
    Stack
} from '@chakra-ui/react';

const UserCommentBotComponent = ({
    item,
}) => {
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
                        onSubmit={(() => {
                            console.log("HI!");
                        })}
                    >
                        <FormControl>
                            <Textarea
                                id='bio'
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