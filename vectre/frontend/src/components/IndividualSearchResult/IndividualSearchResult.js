import {
    Flex,
    Box,
    Image, 
    Grid, 
    Button,
    GridItem, 
    Stack
} from "@chakra-ui/react"
import {TextButton} from "../Buttons/TextButton/TextButton"
import { getAvatarOrDefault, getBannerOrDefault } from "../../utils/Utils";

const IndividualSearchResult = ({username}) => {
    // const dispatch = useDispatch();
    return (
        // <Box marginTop={"20px"}>
        //     <Box padding={"10px"} width={"100%"} height={"119px"} borderRadius={"6px"} bg={"#FFFFFF"} justifyContent={"center"} display={"flex"} flexDirection={"row"}>
        //         <Box backgroundImage={profilePic} background={"cover"} display={"flex"} alignItems={"center"} width={"120px"} height={"120px"} borderRadius={"50%"} />
        //     </Box>
            
        // </Box>
        <Flex
            flexDirection={'column'}
            gap={'20px'}
            position={'relative'}>
            <Box
                position={'absolute'}
                top={'19%'}
                left={'50%'}
                marginLeft={'-60px'}>
                <Image
                    border={'5px solid white'}
                    src={getAvatarOrDefault(null)}
                    fit={'cover'}
                    overflow={'hidden'}
                    borderRadius={'full'}
                    boxSize={'120px'} />
            </Box>
                <Box
                    border={'12px solid white'}
                    bg={'white'}
                    borderRadius={'6px'}
                    height={'142px'}>
                    <Image
                        src={getBannerOrDefault(null)}
                        fit={'cover'}
                        overflow={'hidden'}
                        borderRadius={'6px'}
                        width={'100%'}
                        height={'100%'} />
            </Box>
            <Grid width={"100%"} height={"82px"} borderRadius={"6px"} bg={"#FFFFFF"} justifyItems={"center"} alignContent={"center"} display={"grid"} templateColumns={"1fr 1fr 1fr"} templateRows={"1fr 1fr "} top={"30%"}>
                <GridItem></GridItem>
                <GridItem fontSize={"23px"} fontFamily={"DM Sans"} fontWeight={700} color={"#3B82F6"}>
                    {username}
                </GridItem>
                <GridItem></GridItem>
                <GridItem justifyItems={"center"}><Button width={"100%"} height={"70%"}bottom={"0px"} backgroundColor={"#F6FAFF"}>2022 followers</Button></GridItem>
                <GridItem fontSize={"17px"} fontFamily={"DM Sans"} fontWeight={700} color={"#3B82F6"}>@{username}</GridItem>
                <Button width={"70%"} height={"70%"} backgroundColor={"#3B82F6"} color={"white"}>View</Button>
            </Grid>
        </Flex>
    );
};

export default IndividualSearchResult;