import {
    Stack,
    Flex,
    Image
} from '@chakra-ui/react';

const PostMidComponent = ({
    item,
    onOpen
}) => {
    return (
        <>
            <Flex
                display={'inline-flex'}
                px={'13px'}
                py={'11px'}
                fontSize={'18px'}
                fontWeight={700}
                color={'brand.400'}
                bg={'rgba(255, 255, 255, 0.7)'}
                borderRadius={'6px'}
                alignItems={'center'}>
                {item.text}
            </Flex>
            <Stack>
                <Image
                    cursor={'pointer'}
                    onClick={onOpen}
                    src={item.imageURL}
                    fit={'cover'}
                    overflow={'hidden'}
                    borderRadius={'6px'}
                    height={'250px'} />
            </Stack>
        </>
    );
};

export default PostMidComponent;