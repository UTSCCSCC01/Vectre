import {
    Container,
    SimpleGrid,
    Flex,
    Heading,
    Text,
    Stack,
    Box,
    useColorModeValue,
} from '@chakra-ui/react';
import { FiPenTool } from 'react-icons/fi';
import { BiCode } from 'react-icons/bi';

const CardInfos = [
    {
        heading: "For Community Leaders",
        headingColor: "white",
        text: "Set community guidelines, pin crucial posts, create proposals and keep your community engaged - all in one place!",
        textColor: "rgba(255, 255, 255, 0.8)",
        icon: <FiPenTool size={"2rem"} />,
        bgColorLight: "brand.400",
        bgColorDark: "white",
        iconBgColorLight: "rgba(255, 255, 255, 0.08)",
        iconBgColorDark: "white",
        iconColorLight: "white",
        iconColorDark: "brand.400"

    },
    {
        heading: "For the Community",
        headingColor: "brand.400",
        text: "Showcase your NFTs, find trending projects and engage with your favourite communities - all in one native social platform built for web3.",
        textColor: "#697B98",
        icon: <BiCode size={"2.3rem"} />,
        bgColorLight: "none",
        bgColorDark: "white",
        iconBgColorLight: "brand.400",
        iconBgColorDark: "white",
        iconColorLight: "white",
        iconColorDark: "brand.400"
    }
]

const Card = (props) => {
    return (
        <Flex
            w="full"
            alignItems={"flex-start"}
            flexDirection={"column"}
            p={"50px"}
            bg={useColorModeValue(props.cardInfo.bgColorLight, props.cardInfo.bgColorDark)}
            rounded="10px"
        // boxShadow={"0px 30px 60px rgba(25, 55, 102, 0.25)"}
        >
            <Flex
                justifyContent={"center"}
                bg={useColorModeValue(props.cardInfo.iconBgColorLight, props.cardInfo.iconBgColorDark)}
                color={useColorModeValue(props.cardInfo.iconColorLight, props.cardInfo.iconColorDark)}
                p={7}
                rounded="6px"
                boxShadow={"0px 30px 60px rgba(25, 55, 102, 0.25)"}
            >
                <div>
                    {props.cardInfo.icon}
                </div>
            </Flex>

            <Box>
                <Heading
                    fontSize="24px"
                    fontWeight="bold"
                    mt={8}
                    as={"h1"}
                    color={useColorModeValue(props.cardInfo.headingColor, "white")}
                >
                    {props.cardInfo.heading}
                </Heading>
                <Text
                    fontSize="16px"
                    mt={2}
                    lineHeight={"30px"}
                    color={useColorModeValue(props.cardInfo.textColor, "gray.300")}
                >
                    {props.cardInfo.text}
                </Text>
            </Box>
        </Flex>
    )
}

const LandingPageMidComponent = () => {
    return (
        <Container maxW={'8xl'}>
            <Stack py={36}>
                <Flex justifyContent={"center"} textAlign={"center"} my={{ base: 8, md: 16 }}>
                    <Text
                        maxW={'xl'}
                        fontWeight={500}
                        fontSize={'32px'}
                        lineHeight={'44px'}
                        color={useColorModeValue("brand.400", "white")}
                    >
                        Vectre was designed with the community in mind, providing founders with community management tools.
                    </Text>
                </Flex>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    {CardInfos.map((cardInfo, i) => (
                        <Card key={i} cardInfo={cardInfo} />
                    ))}
                </SimpleGrid>
            </Stack>
        </Container>
    );
};

export default LandingPageMidComponent;