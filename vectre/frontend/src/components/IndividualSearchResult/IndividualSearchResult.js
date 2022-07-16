import {
    Flex,
    Box,
    Image,
    Link
} from "@chakra-ui/react"
import { getAvatarOrDefault, getBannerOrDefault } from "../../utils/Utils";

const IndividualSearchResult = ({
    result
}) => {
    const SEARCH_RESULT_TYPES = {
        USER: "user",
        COMMUNITY: "community"
    }
    const type = result.walletAddress ? SEARCH_RESULT_TYPES.USER : SEARCH_RESULT_TYPES.COMMUNITY

    return (
        <Link _hover={{ textDecoration: "none" }} href={result.communityID ? `/c/${result.communityID}` : `/user/${result.walletAddress}`}>
            <Flex
                flexDirection={'column'}
                gap={'20px'}
                position={'relative'}
            >
                <Box
                    position={'absolute'}
                    top={'25%'}
                    left={'50%'}
                    marginLeft={'-60px'}
                    zIndex={4}>
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
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={"6px"}
                    bg={"white"}
                    flexDirection={'column'}
                    px={'16px'}
                    py={'16px'}
                    position={'relative'}>
                    <Box fontSize={"20px"} fontWeight={700} color={"#3B82F6"} >
                        {type === SEARCH_RESULT_TYPES.USER ? result.name : result.name}
                    </Box>
                    <Box fontSize={"12px"} fontWeight={700} color={"#3B82F6"}>
                        {type === SEARCH_RESULT_TYPES.USER ? "@" + result.username : "< " + result.communityID + " >"}
                    </Box>
                    <Box
                        position={'absolute'}
                        bottom={'0'}
                        left={'0'}
                        px={'18.5px'}
                        py={'5.5px'}
                        m={'5px'}
                        bg={"rgba(246, 250, 255, 1)"}
                        fontSize={"11px"}
                        color={"primary.400"}>
                        {type === SEARCH_RESULT_TYPES.USER ?
                            (result.followerCount ? result.followerCount : 0) + " followers"
                            :
                            (result.memberCount ? result.memberCount : 0) + " members"
                        }
                    </Box>
                </Flex>
            </Flex>
        </Link>
    );
};

export default IndividualSearchResult;