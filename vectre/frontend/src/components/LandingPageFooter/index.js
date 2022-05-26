import {
    Box,
    Container,
    Flex,
    Link,
    Stack,
    Text,
    useColorModeValue,
    IconButton
} from '@chakra-ui/react';

import { ReactComponent as LogoIcon } from '../../assets/icons/logo-V.svg'

const ListHeader = ({ children }) => {
    return (
        <Text
            fontWeight={'700'}
            fontSize={'14px'}
            mb={2}
            textTransform={'uppercase'}
            letterSpacing={'0.1em'}
            lineHeight={'18px'}
            color={'rgba(255, 255, 255, 0.6)'}>
            {children}
        </Text>
    );
};

const Logo = () => {
    return (
        <Box>
            <IconButton
                size='lg'
                background={'#F9FBFF'}
                icon={<LogoIcon height="3rem" filter={"drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"} />}
                boxShadow={'0px 30px 60px rgba(59, 130, 246, 0.25)'}
                aria-label={'logo'}
                isRound={'true'}
                cursor={'unset'}
                _focus={{ outline: 0 }}
                _hover={{ background: '#F9FBFF' }}
                _active={{ background: '#F9FBFF' }}>
            </IconButton>
        </Box>
    );
}

export default function LargeWithLogoLeft() {
    return (
        <Box>
            <Box
                height={"102px"}
                width={'100%'}
                background={useColorModeValue('brand.400', 'gray.900')}
                zIndex={-1}
                position={'relative'}
                overflow={'hidden'}
                transform={'skewY(-2deg)'}
                top={'64px'} />
            <Box
                bg={useColorModeValue('brand.400', 'gray.900')}
                color={useColorModeValue('rgba(255, 255, 255, 0.8)', 'gray.200')}>
                <Container as={Stack} maxW={'8xl'} pt={{ base: 4, md: 16 }} pb={{ base: 16, md: 20 }}>
                    <Flex
                        flexDirection={{ base: 'column', md: 'row' }}
                        justifyContent={'space-between'}
                        align-content={'space-evenly'}
                        columnGap={'15px'}>
                        <Stack
                            spacing={'15px'}
                            my={'15px'}>
                            <Logo />
                            <Text
                                color={useColorModeValue('white', 'white')}
                                fontWeight={700}
                                fontSize="18px">
                                Vectre
                            </Text>
                            <Text
                                fontSize={'16px'}
                                lineHeight={'28px'}
                                fontWeight={400}
                                width={{ base: '100%', md: '75%' }}>
                                Vectre Labs are a team of builders and software engineers building and
                                spearheading products for web3. The new age of the internet is here.
                            </Text>
                        </Stack>
                        <Flex
                            flexDirection={'row'}
                            justifyContent={{ base: 'space-between', md: 'space-around' }}
                            columnGap={'25px'}
                            my={'15px'}>
                            <Stack align={'flex-start'} px={{ base: '0px', md: '25px' }} width={'max-content'}>
                                <ListHeader>Vectre</ListHeader>
                                <Link href={'#'}>Sign Up</Link>
                                <Link href={'#'}>Enter the App</Link>
                            </Stack>
                            <Stack align={'flex-start'} px={{ base: '0px', md: '25px' }} width={'max-content'}>
                                <ListHeader>Get in touch</ListHeader>
                                <Link href={'#'}>Twitter</Link>
                                <Link href={'#'}>Medium</Link>
                            </Stack>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
}