import {
    Stack,
    Flex,
    Image,
    Box,
    Text
} from '@chakra-ui/react';

import RepostComponent from '../RepostComponent/RepostComponent';

const PostMidComponent = ({
    item,
    onOpen
}) => {
    return (
        <>
            <Flex
                display={item.text ? 'inline-flex' : 'none'}
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
            {
                item.repostPostID ? (
                    item.repostPostID === "removed" ? (
                        <>
                            <Flex
                                height={'fit-content'}
                                bg={'rgba(198, 219, 255, 0.44)'}
                                border={'3px solid #C6DBFF'}
                                borderRadius={'6px'}
                                px={'18px'}
                                py={'15px'}
                                cursor={'default'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                onClick={((e) => {
                                    e.stopPropagation();
                                })}>
                                <Text>This post has been deleted 😭</Text>
                            </Flex>
                        </>
                    ) :
                        <Stack
                            display={'inline-flex'}>
                            <RepostComponent item={item.repostPost} />
                        </Stack>
                ) : (
                    <Stack
                        display={item.imageURL ? 'inline-flex' : 'none'}>
                        <Image
                            cursor={'pointer'}
                            onClick={((e) => {
                                onOpen();
                                e.stopPropagation();
                            })}
                            src={item.imageURL}
                            fit={'cover'}
                            overflow={'hidden'}
                            borderRadius={'6px'}
                            height={'250px'} />
                    </Stack>
                )
            }
        </>
    );
};

export default PostMidComponent;