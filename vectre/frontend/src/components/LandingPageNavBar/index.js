import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Container
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon
} from '@chakra-ui/icons';

import { ReactComponent as LogoIcon } from '../../assets/icons/vectre-logo.svg'

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Container maxW={'8xl'}>
            <Flex
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                pt={{ base: 20 }}
                align={'center'}
                justifyContent="space-between">
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex alignItems="center" display={{ base: 'none', md: 'flex' }}>
                    <Flex mr={{ base: 'none', md: '10vw' }} alignItems="center">
                        <LogoIcon height="3rem" />
                        <Text
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            fontFamily={'heading'}
                            color={useColorModeValue('brand.400', 'white')}
                            fontWeight={600}
                            fontSize="30px"
                            ml="15px">
                            Vectre
                        </Text>
                    </Flex>

                    <Flex display={{ base: 'none', md: 'flex' }}>
                        <DesktopNav />
                    </Flex>
                </Flex>
                <Stack
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                    display={{ base: 'none', md: 'flex' }}>
                    <Link
                        href='/test'
                        _hover={{ textDecoration: "none" }}>
                        <Button
                            display={{ base: 'none', md: 'inline-flex' }}
                            px={'28px'}
                            fontSize={'18px'}
                            fontWeight={700}
                            color={'blue.400'}
                            bg={'white'}
                            _hover={{
                                bg: 'WhiteAlpha.900',
                            }}>
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
    const linkHoverColor = useColorModeValue('sub.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'sub.800');

    return (
        <Stack direction={'row'} spacing="50px">
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label} >
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={navItem.fontWeight}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'blue.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
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
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
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