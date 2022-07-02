import {
    Flex,
    Box,
    Text
} from '@chakra-ui/react';
import TextButton from '../Buttons/TextButton/TextButton';
import ButtonLinkWrapper from '../Buttons/ButtonLinkWrapper/ButtonLinkWrapper';

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
                        Please log in to leave a comment
                    </Text>
                    <ButtonLinkWrapper href={'/login'}>
                        <TextButton
                            text={`Login`}
                            px={'17.5px'}
                            fontSize={'18px'}
                            fontWeight={700}
                            bg={'primary.400'}
                            color={'white'} />
                    </ButtonLinkWrapper>
                </Flex>
            </Box>
        </>
    );
};

export default UserCommentNotLoggedInComponent;