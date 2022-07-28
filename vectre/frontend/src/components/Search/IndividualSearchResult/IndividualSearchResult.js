import {
    Flex,
    Box,
    Image,
    Link
} from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { cutText, getAvatarOrDefault } from "../../../utils/Utils";
import ToggleHollowButton from "../../Buttons/ToggleHollowButton/ToggleHollowButton";
import { doFollowSearchedCommunities, doUnfollowSearchedCommunities, joinCommunity, leaveCommunity } from "../../../redux/actions/communities";
import React, { useState } from "react";

const IndividualSearchResult = ({
    result
}) => {
    const dispatch = useDispatch();

    const SEARCH_RESULT_TYPES = {
        USER: "user",
        COMMUNITY: "community"
    }
    const type = result.walletAddress ? SEARCH_RESULT_TYPES.USER : SEARCH_RESULT_TYPES.COMMUNITY

    const onCommunitiesFollowClick = () => {
        if (result.alreadyJoined) {
            dispatch(leaveCommunity(result.communityID, () => dispatch(doUnfollowSearchedCommunities(result.communityID))))
        }
        else {
            dispatch(joinCommunity(result.communityID, () => dispatch(doFollowSearchedCommunities(result.communityID))))
        }
    }

    return (
        <Link _hover={{ textDecoration: "none" }} href={result.communityID ? `/c/${result.communityID}` : `/user/${result.walletAddress}`}>
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                borderRadius={"6px"}
                bg={"white"}
                flexDirection={'row'}
                px={'12px'}
                py={'12px'}>
                <Flex
                    flexDirection={'row'}
                    alignItems={"center"}
                    gap={'15px'}>
                    <Image
                        border={'5px solid white'}
                        src={getAvatarOrDefault(result.profilePic)}
                        fit={'cover'}
                        overflow={'hidden'}
                        borderRadius={'full'}
                        boxSize={'65px'} />
                    <Box>
                        <Box fontSize={"18px"} fontWeight={500} color={"primary.400"} >
                            {cutText(result.name, 20)}
                        </Box>
                        <Box fontSize={"13px"} fontWeight={400} color={"primary.400"}>
                            {type === SEARCH_RESULT_TYPES.USER ? "@" + result.username : "< " + result.communityID + " >"}
                        </Box>
                    </Box>
                </Flex>

                {
                    type === SEARCH_RESULT_TYPES.USER ? (
                        <ToggleHollowButton
                            alignSelf={'flex-start'}
                            mt={'10px'}
                            onText={'Followed'}
                            offText={'Follow'} />
                    ) : (
                        <ToggleHollowButton
                            alignSelf={'flex-start'}
                            mt={'10px'}
                            onText={'Joined'}
                            offText={'Join'}
                            isOn={result.alreadyJoined}
                            onClick={() => onCommunitiesFollowClick()} />
                    )
                }

            </Flex>
        </Link>
    );
};

export default IndividualSearchResult;