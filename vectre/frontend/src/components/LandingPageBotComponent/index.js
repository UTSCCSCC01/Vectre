import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Link
} from '@chakra-ui/react';

import { FiDownload } from 'react-icons/fi';
import { RiTwitterLine } from 'react-icons/ri';

function LandingPageBotComponent() {
    return (
        <Container maxW={'3xl'}>
            <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 8, md: 14 }}
                py={{ base: 20, md: 36 }}>
                <Text
                    width={'105px'}
                    alignSelf={'center'}
                    color={'#3B82F6'}
                    letterSpacing={'0.1em'}
                    fontWeight={700}
                    fontSize={'16px'}
                    bg={useColorModeValue('#3B82F61A', 'blue.900')}
                    p={2}
                    rounded={'md'}>
                    Socials
                </Text>
                <Heading
                    as={"h1"}
                    mt={'16px !important'}
                    fontWeight={500}
                    fontSize={'32px'}
                    lineHeight={'44px'}
                    color={useColorModeValue("brand.400", "white")}>
                    Follow to be a Beta Tester!
                </Heading>
                <Text color={useColorModeValue("sub.400", "white")} mt={'16px !important'} maxW={'xl'} alignSelf={'center'}>
                    We chose to build in the open and we appreciate all feedback and ideas,
                    feel free to let us know and send us a DM on Twitter.
                </Text>
                <Stack
                    mt={'40px !important'}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={3}
                    align={'center'}
                    alignSelf={'center'}
                    position={'relative'}>
                    <Link
                        href='#'
                        _hover={{ textDecoration: "none" }}>
                        <Button
                            rounded={'6px'}
                            size={'lg'}
                            fontWeight={700}
                            px={8}
                            py={8}
                            fontSize={'16px'}
                            textColor={'white'}
                            bg={'#3B82F6'}
                            leftIcon={<FiDownload size={'1.6rem'} />}
                            boxShadow={'0px 30px 60px rgba(59, 130, 246, 0.25)'}
                            _hover={{ bg: '#3B82F6dd' }}
                            _focus={{ outline: 0 }}>
                            Read our Work on Medium
                        </Button>
                    </Link>
                    <Link
                        href='#'
                        _hover={{ textDecoration: "none" }}>
                        <Button
                            rounded={'6px'}
                            size={'lg'}
                            fontWeight={700}
                            px={8}
                            py={8}
                            fontSize={'16px'}
                            textColor={'white'}
                            bg={'#1DA1F2'}
                            rightIcon={<RiTwitterLine size={'1.8rem'} />}
                            boxShadow={'0px 30px 60px rgba(29, 161, 242, 0.25)'}
                            _hover={{ bg: '#1DA1F2dd' }}
                            _focus={{ outline: 0 }}>
                            Say Hello
                        </Button>
                    </Link>
                    <Box>
                        <Icon
                            as={Arrow}
                            color={useColorModeValue('gray.800', 'gray.300')}
                            w={'71px'}
                            position={'absolute'}
                            right={{ base: '-21px', md: '-71px' }}
                            top={{ base: '103px', md: '25px' }}
                        />
                        <Text
                            fontSize={'lg'}
                            fontFamily={'Shadows Into Light'}
                            position={'absolute'}
                            right={{ base: '-47px', md: '-100px' }}
                            top={{ base: '72px', md: '-4px' }}
                            transform={'rotate(10deg)'}>
                            tweet us!
                        </Text>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    );
}

const Arrow = createIcon({
    displayName: 'Arrow',
    viewBox: '0 0 72 24',
    path: (
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
            fill="currentColor"
        />
    ),
});

export default LandingPageBotComponent;