import {
    Box,
    Button,
    Flex,
    Image,
    Link
} from '@chakra-ui/react';

import { ReactComponent as VerifiedIcon } from '../../../assets/icons/verified-icon.svg';

const PostTopComponent = ({
    item,
}) => {
    return (
        <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'space-between'}>
            <Flex gap={'10px'}>
                <Link
                    href={"/users/" + item.author.walletAddress}
                    _hover={{ textDecoration: "none" }}>
                    <Button
                        display={'inline-flex'}
                        px={'17.5px'}
                        fontSize={'18px'}
                        fontWeight={700}
                        color={'primary.400'}
                        bg={'white'}
                        leftIcon={
                            <Image
                                src={item.author.profilePic}
                                fit={'cover'}
                                overflow={'hidden'}
                                borderRadius={'full'}
                                boxSize={'32px'} />
                        }
                        _focus={{ outline: 0 }}>
                        {item.author.username}
                    </Button>
                </Link>
                <Box
                    display={'inline-flex'}
                    px={'8px'}
                    py={'3px'}
                    fontSize={'18px'}
                    fontWeight={700}
                    color={'rgb(242,172,88)'}
                    bg={'white'}
                    borderRadius={'6px'}
                    alignItems={'center'}>
                    <VerifiedIcon size="1.5rem" />
                </Box>
            </Flex>
            <Box
                display={'inline-flex'}
                px={'17.5px'}
                fontSize={'12px'}
                fontWeight={500}
                color={'primary.400'}
                bg={'white'}
                borderRadius={'6px'}
                alignItems={'center'}>
                {item.timestamp}
            </Box>
        </Flex>
    );
};

export default PostTopComponent;