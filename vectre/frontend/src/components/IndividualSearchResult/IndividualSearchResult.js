import {
    Flex,
    Box,
    Image, 
    Grid, 
    Button,
    GridItem, 
    Stack, 
    Link
} from "@chakra-ui/react"
import {TextButton} from "../Buttons/TextButton/TextButton"
import { getAvatarOrDefault, getBannerOrDefault } from "../../utils/Utils";

const IndividualSearchResult = ({
    result
}) => {
    // const dispatch = useDispatch();
    const SEARCH_RESULT_TYPES = {
        USER: "user",
        COMMUNITY: "community"
    }
    const type = result.walletAddress ? SEARCH_RESULT_TYPES.USER : SEARCH_RESULT_TYPES.COMMUNITY

    return (
        // <Box marginTop={"20px"}>
        //     <Box padding={"10px"} width={"100%"} height={"119px"} borderRadius={"6px"} bg={"#FFFFFF"} justifyContent={"center"} display={"flex"} flexDirection={"row"}>
        //         <Box backgroundImage={profilePic} background={"cover"} display={"flex"} alignItems={"center"} width={"120px"} height={"120px"} borderRadius={"50%"} />
        //     </Box>
            
        // </Box>
        <Link _hover={{ textDecoration: "none" }} href={result.communityID ? `/c/${result.communityID}`: `/user/${result.username}`}>
            <Flex
                flexDirection={'column'}
                gap={'20px'}
                position={'relative'}
                border={"1px solid rgba(12,12,12,0)"}
                _hover={{border:"1px solid rgba(12,12,12, 0.5)"}}
                >
                <Box
                    position={'absolute'}
                    top={'19%'}
                    left={'50%'}
                    marginLeft={'-60px'}>
                    <Image
                        border={'5px solid white'}
                        src={getAvatarOrDefault(result.profilePic)}
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
                            src={getBannerOrDefault(result.banner)}
                            fit={'cover'}
                            overflow={'hidden'}
                            borderRadius={'6px'}
                            width={'100%'}
                            height={'100%'} />
                </Box>
                <Grid width={"100%"} height={"82px"} borderRadius={"6px"} bg={"#FFFFFF"} justifyItems={"center"} alignContent={"center"} display={"grid"} templateColumns={"1fr 1fr 1fr"}>
                    <GridItem></GridItem>
                    <GridItem >
                        <Stack textAlign={"center"} alignSelf={"center"} alignContent = {"center"}justifyContent={"center"} paddingTop={"25px"}>
                            <Box fontSize={"23px"} fontFamily={"DM Sans"} fontWeight={700} color={"#3B82F6"} lineHeight={"10px"}>
                                {type === SEARCH_RESULT_TYPES.USER ? result.name : result.name}
                            </Box>
                            <Box fontSize={"17px"} fontFamily={"DM Sans"} fontWeight={700} color={"#3B82F6"}>
                                {type === SEARCH_RESULT_TYPES.USER ? "@" + result.username : "< " + result.communityID + " >"}
                            </Box>
                        </Stack>
                    </GridItem>
                    <GridItem alignSelf={"end"}>
                        <Button width={"100%"} height={"70%"}bottom={"0px"} backgroundColor={"#F6FAFF"} fontSize={"11px"} color={"#3B82F6"}>
                            {type === SEARCH_RESULT_TYPES.USER ?
                                (result.followerCount ? result.followerCount : 0) + " followers"
                                :
                                (result.memberCount ? result.memberCount : 0) + " members"
                            }
                        </Button>
                    </GridItem>
                </Grid>
            </Flex>
        </Link>
    );
};

export default IndividualSearchResult;