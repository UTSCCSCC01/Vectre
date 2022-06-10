import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Link,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Container
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon
} from '@chakra-ui/icons';

import VectreIcon from '../../Icons/VectreIcon'

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Container maxW={'8xl'}>
            <Flex
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                pt={{ base: 10, lg: 20 }}
                align={'center'}
                justifyContent="space-between">
                <Flex
                    flex={{ base: 1, lg: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', lg: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                        _focus={{ outline: 0 }}
                    />
                </Flex>
                <Flex alignItems="center" display={{ base: 'none', lg: 'flex' }}>
                    <Flex mr={{ base: 'none', lg: '10vw' }} alignItems="center">
                        <VectreIcon />
                        <Text
                            textAlign={useBreakpointValue({ base: 'center', lg: 'left' })}
                            color={useColorModeValue('brand.400', 'white')}
                            fontWeight={700}
                            fontSize="30px"
                            ml="15px">
                            Vectre
                        </Text>
                    </Flex>

                    <Flex display={{ base: 'none', lg: 'flex' }}>
                        <DesktopNav />
                    </Flex>
                </Flex>
                <Stack
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                    display={{ base: 'none', lg: 'flex' }}>
                    <Link
                        href='/home'
                        _hover={{ textDecoration: "none" }}>
                        <Button
                            display={{ base: 'none', lg: 'inline-flex' }}
                            px={'28px'}
                            fontSize={'18px'}
                            fontWeight={700}
                            color={'blue.400'}
                            bg={'white'}
                            transition={'all .2s ease-in-out'}
                            _hover={{
                                bg: 'blue.400',
                                color: 'white'
                            }}
                            _focus={{ outline: 0 }}>
                            Enter the App
                        </Button>
                    </Link>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Container>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('sub.400', 'sub.200');
    const linkHoverColor = useColorModeValue('#697B98dd', 'white');

    return (
        <Stack direction={'row'} spacing="50px">
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label} >
                    <Link
                        p={2}
                        href={navItem.href ?? '#'}
                        fontSize={'sm'}
                        fontWeight={navItem.fontWeight}
                        color={linkColor}
                        _hover={{
                            textDecoration: 'none',
                            color: linkHoverColor,
                        }}
                        _focus={{ outline: 0 }}>
                        {navItem.label}
                    </Link>
                </Box>
            ))}
        </Stack>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ lg: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('brand.400', 'gray.200')}>
                    {label}
                </Text>
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('brand.400', 'gray.700')}
                    align={'start'}>
                </Stack>
            </Collapse>
        </Stack>
    );
};

const NAV_ITEMS = [
    {
        label: 'About Us',
        href: '#',
        fontWeight: '700'
    },
    {
        label: 'Learn More',
        href: '#',
        fontWeight: '400'
    },
    {
        label: 'Follow us on Twitter',
        href: '#',
        fontWeight: '400'
    }
];