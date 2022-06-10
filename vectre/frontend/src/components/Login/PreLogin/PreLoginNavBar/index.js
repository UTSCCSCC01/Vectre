import {
    IconButton,
    Button,
    Stack,
    Link,
    useColorModeValue,
    Container,
    Grid,
    GridItem
} from '@chakra-ui/react';

import { FaWallet } from 'react-icons/fa'
import { IoHome } from 'react-icons/io5'

// export default function PreLoginNavBar({ connectAccount }) {
export default function PreLoginNavBar({  }) {
    return (
        <Container maxW={'8xl'}>
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
                            href='/'
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
                    </Stack>
                </GridItem>
                {/*<GridItem*/}
                {/*    justifySelf={'end'}>*/}
                {/*    <Button*/}
                {/*        rounded={'6px'}*/}
                {/*        size={'lg'}*/}
                {/*        fontWeight={700}*/}
                {/*        px={'31.5px'}*/}
                {/*        py={'23px'}*/}
                {/*        fontSize={'sm'}*/}
                {/*        textColor={'primary.400'}*/}
                {/*        bg={'rgba(255, 255, 255, 0.63)'}*/}
                {/*        rightIcon={<FaWallet ml={'10px'} />}*/}
                {/*        _focus={{ outline: 0 }}*/}
                {/*        onClick={connectAccount}*/}
                {/*    >*/}
                {/*        Connect to a Wallet*/}
                {/*    </Button>*/}
                {/*</GridItem>*/}
            </Grid>
        </Container>
    );
}
