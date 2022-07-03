import {
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Link,
    useColorModeValue,
    useBreakpointValue,
    Container,
    Grid,
    GridItem
} from '@chakra-ui/react';

import { IoHome } from 'react-icons/io5'
import { HiTrendingUp, HiSearch } from 'react-icons/hi'
import { FaWallet } from 'react-icons/fa'
import NotificationPopover from '../Notifications/NotificationPopover'

import VectreIcon from '../Icons/VectreIcon'
import { loggedInUserSelector } from "../../redux/selectors/users";
import { useSelector } from "react-redux";

export default function NavBar() {
    const loggedInUser = useSelector(loggedInUserSelector)
    return (
        <Container maxW={'8xl'}>
            <Flex alignItems="center"
                position={'absolute'}
                top={'50px'}
                left={'50%'}
                text-align={'center'}
                marginLeft={'-90px'}>
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
            <Grid
                color={useColorModeValue('gray.600', 'white')}
                pt={{ base: 10, lg: 12 }}
                align={'center'}
                alignItems={'center'}
                gridTemplateColumns={'1fr 1fr'}>
                <GridItem
                    justifySelf={'start'}>
                    <Stack
                        direction={'row'}
                        spacing={6}
                        display={{ base: 'none', lg: 'flex' }}
                        alignItems={'center'}>
                        <Link
                            href='/home'
                            _hover={{ textDecoration: "none" }}>
                            <IconButton
                                size={'lg'}
                                transform={'scale(1.2)'}
                                color={'primary.400'}
                                isRound={'true'}
                                bg={'white'}
                                icon={<IoHome size="1.5rem" />}
                                _focus={{ outline: 0 }}>
                            </IconButton>
                        </Link>
                        <Link
                            href='/trending'
                            _hover={{ textDecoration: "none" }}>
                            <Button
                                display={{ base: 'none', lg: 'inline-flex' }}
                                px={'17.5px'}
                                fontSize={'18px'}
                                fontWeight={700}
                                color={'primary.400'}
                                bg={'white'}
                                leftIcon={<HiTrendingUp size="1.5rem" />}
                                _focus={{ outline: 0 }}>
                                Trending
                            </Button>
                        </Link>
                        <Link
                            href='#'
                            _hover={{ textDecoration: "none" }}>
                            <Button
                                display={{ base: 'none', lg: 'inline-flex' }}
                                px={'17.5px'}
                                fontSize={'18px'}
                                fontWeight={700}
                                color={'primary.400'}
                                bg={'white'}
                                leftIcon={<HiSearch size="1.4rem" />}
                                _focus={{ outline: 0 }}>
                                Search
                            </Button>
                        </Link>
                    </Stack>
                </GridItem>
                <GridItem
                    justifySelf={'end'}>
                    <Stack
                        direction={'row'}
                        spacing={6}
                        display={{ base: 'none', lg: 'flex' }}
                        alignItems={'center'}>
                        <Link
                            href='#'
                            _hover={{ textDecoration: "none" }}>
                            <Button
                                display={{ base: 'none', lg: 'inline-flex' }}
                                px={'17.5px'}
                                fontSize={'18px'}
                                fontWeight={700}
                                color={'primary.400'}
                                bg={'white'}
                                _focus={{ outline: 0 }}>
                                --- $ETH
                            </Button>
                        </Link>
                        <NotificationPopover />
                        <Link
                            href={Object.keys(loggedInUser).length === 0 ? "/login" : `/user/${loggedInUser.walletAddress}`}
                            _hover={{ textDecoration: "none" }}>
                            <IconButton
                                size={'lg'}
                                transform={'scale(1.2)'}
                                color={'primary.400'}
                                isRound={'true'}
                                bg={'white'}
                                icon={<FaWallet size="1.4rem" />}
                                _focus={{ outline: 0 }}>
                            </IconButton>
                        </Link>
                    </Stack>
                </GridItem>
            </Grid>
        </Container>
    );
}