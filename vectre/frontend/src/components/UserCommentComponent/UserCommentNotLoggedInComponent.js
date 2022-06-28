import {
    Flex,
    Box,
    Text
} from '@chakra-ui/react';
import TextButton from '../Buttons/TextButton/TextButton';

const UserCommentNotLoggedInComponent = () => {
    return (
        <>
            <Box
                height={'fit-content'}
                bg={'rgba(255, 255, 255, 0.5)'}
                borderRadius={'6px'}
                mt={'0px !important'}
                px={'18px'}
                py={'15px'}>
                <Flex
                    gap={'4px'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Text>
                        Log in or Sign up to leave a comment
                    </Text>
                    <TextButton
                        text={`Login / Signup`}
                        px={'17.5px'}
                        fontSize={'18px'}
                        fontWeight={700}
                        bg={'primary.400'}
                        color={'white'} />
                </Flex>
            </Box>
        </>
    );
};

export default UserCommentNotLoggedInComponent;