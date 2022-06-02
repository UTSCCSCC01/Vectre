import {
    Container,
    Stack,
    Box,
    Flex,
    Text,
    Button,
    Link
} from '@chakra-ui/react';
import MetamaskIcon from '../Icons/MetamaskIcon'
import VectreIcon from '../Icons/VectreIcon'

const PreLogin = ({ ...otherProps }) => {
    return (
        <Box height={'85vh'}>
            <Container
                maxW={'8xl'}
                alignItems={'center'}
                height={'inherit'}
                display={'flex'}>
                <Flex
                    margin={'auto'}
                    align={'center'}
                    alignItems={'center'}
                    spacing={{ base: 8, lg: 10 }}
                    direction={{ base: 'column', lg: 'row' }}>
                    <Stack
                        flex={1}
                        pr={{ base: "0px", md: "50px" }}
                        alignItems={'center'}>
                        <Flex alignItems="center">
                            <VectreIcon transform={'scale(2)'} />
                            <Text
                                textAlign={'left'}
                                color={'brand.400'}
                                fontWeight={700}
                                fontSize="90px"
                                ml="45px">
                                Vectre
                            </Text>
                        </Flex>
                        <Text color={'brand.400'} fontSize={{ base: "20px", md: '30px' }} mt={'60px !important'}>
                            To use Vectre,
                            <Text
                                as={'span'} color={'brand.400'} fontWeight={'700'}> connect </Text>
                            your wallet.
                        </Text>
                        <Text color={'brand.400'} fontSize={{ base: "18px", md: '22px' }} mt={'15px !important'}>
                            Communities and friends await you.
                        </Text>
                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            mt={'60px !important'}>
                            <Link
                                href='#'
                                _hover={{ textDecoration: "none" }}>
                                <Button
                                    rounded={'6px'}
                                    size={'lg'}
                                    fontWeight={700}
                                    px={'60px'}
                                    py={'23px'}
                                    fontSize={'sm'}
                                    textColor={'primary.400'}
                                    bg={'rgba(255, 255, 255, 0.63)'}
                                    leftIcon={<MetamaskIcon transform={'scale(2)'} mr={'10px'} />}
                                    _focus={{ outline: 0 }}
                                    border={'2px solid var(--chakra-colors-primary-400)'}
                                    onClick={otherProps.connectAccount}>
                                    Connect with Metamask
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Flex>
            </Container>
        </Box>
    );
};

export default PreLogin;