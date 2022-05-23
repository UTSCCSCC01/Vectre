import {
    Box,
    Container,
    Flex,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

import { ReactComponent as LogoIcon } from '../../assets/icons/vectre-logo.svg'

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
                            <LogoIcon height="3rem" />
                            <Text
                                color={useColorModeValue('white', 'white')}
                                fontWeight={700}
                                fontSize="18px">
                                Vectre
                            </Text>
                            <Text
                                fontSize={'16px'}
                                lineHeight={'28px'}
                                fontWeight={400}>
                                Wumbo is a team of creative developers who have an interest in design. We create design templates, UI kits and other products that make people's work easier and faster.
                            </Text>
                        </Stack>
                        <Flex
                            flexDirection={'row'}
                            justifyContent={{ base: 'space-between', md: 'space-around' }}
                            columnGap={'25px'}
                            my={'15px'}>
                            <Stack align={'flex-start'} px={{ base: '0px', md: '25px' }} width={'max-content'}>
                                <ListHeader>Products</ListHeader>
                                <Link href={'#'}>Social Feeds</Link>
                                <Link href={'#'}>React UI Kit</Link>
                                <Link href={'#'}>Stisla Design</Link>
                                <Link href={'#'}>More Products</Link>
                            </Stack>
                            <Stack align={'flex-start'} px={{ base: '0px', md: '25px' }} width={'max-content'}>
                                <ListHeader>Company</ListHeader>
                                <Link href={'#'}>About Us</Link>
                                <Link href={'#'}>Contact</Link>
                                <Link href={'#'}>Privacy Policy</Link>
                                <Link href={'#'}>Terms of Service</Link>
                                <Link href={'#'}>Help</Link>
                            </Stack>
                            <Stack align={'flex-start'} px={{ base: '0px', md: '25px' }} width={'max-content'}>
                                <ListHeader>Get in touch</ListHeader>
                                <Link href={'#'}>Twitter</Link>
                                <Link href={'#'}>Facebook</Link>
                                <Link href={'#'}>Dribble</Link>
                            </Stack>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
}