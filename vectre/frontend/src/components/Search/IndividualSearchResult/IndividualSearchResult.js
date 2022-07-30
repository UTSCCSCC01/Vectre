import { useDispatch, useSelector } from "react-redux";
import { cutText, formatNumberItemString } from "../../../utils/Utils";
import ToggleHollowButton from "../../Buttons/ToggleHollowButton/ToggleHollowButton";
import { joinCommunity, leaveCommunity } from "../../../redux/actions/communities";
import React, { useState } from "react";
import { followUser, unfollowUser } from "../../../redux/actions/users";
import { loggedInUserSelector } from "../../../redux/selectors/users";
import EntityCard from "../../EntityCard/EntityCard";
import {
    doFollowSearchedUsers,
    doJoinSearchedCommunities,
    doLeaveSearchedCommunities,
    doUnfollowSearchedUsers
} from "../../../redux/actions/search";
import { Box, Flex } from "@chakra-ui/react";

const IndividualSearchResult = ({
    result
}) => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(loggedInUserSelector);
    const SEARCH_RESULT_TYPES = {
        USER: "user",
        COMMUNITY: "community"
    }
    const type = result.walletAddress ? SEARCH_RESULT_TYPES.USER : SEARCH_RESULT_TYPES.COMMUNITY

    const onCommunitiesFollowClick = () => {
        if (result.alreadyJoined) {
            dispatch(leaveCommunity(result.communityID, () => dispatch(doLeaveSearchedCommunities(result.communityID))))
        }
        else {
            dispatch(joinCommunity(result.communityID, () => dispatch(doJoinSearchedCommunities(result.communityID))))
        }
    }

    const onUsersFollowClick = () => {
        if (result.alreadyFollowed) {
            dispatch(unfollowUser(result.walletAddress, null, null, () => dispatch(doUnfollowSearchedUsers(result.walletAddress))))
        }
        else {
            dispatch(followUser(result.walletAddress, null, null, () => dispatch(doFollowSearchedUsers(result.walletAddress))))
        }
    }

    const [ghost, setGhost] = useState(false);

    return (
        <>
            <EntityCard
                primaryText={cutText(result.name, 20)}
                secondaryText={type === SEARCH_RESULT_TYPES.USER ? "@" + result.username : "< " + result.communityID + " >"}
                tertiaryText={cutText(result.bio, 40)}
                data={result}
                href={result.communityID ? `/c/${result.communityID}` : `/user/${result.walletAddress}`}>
                <Flex
                    height={'65px'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                    alignItems={'flex-end'}>
                    {
                        type === SEARCH_RESULT_TYPES.USER ? (
                            loggedInUser && loggedInUser.walletAddress !== result.walletAddress ?
                                <ToggleHollowButton
                                    onText={'Following'}
                                    offText={'Follow'}
                                    isOn={result.alreadyFollowed}
                                    onClick={() => onUsersFollowClick()} />
                                :
                                <ToggleHollowButton
                                    accent={'white'}
                                    borderAccent={'rgba(255, 89, 89, 0.8)'}
                                    onText={'👻'}
                                    offText={'📦'}
                                    isOn={ghost}
                                    onClick={() => {
                                        setGhost(!ghost);
                                        new Promise(r => setTimeout(r, Math.random() * 1500 + 500)).then(() => {
                                            setGhost(false);
                                        });
                                    }} />
                        ) : (
                            <ToggleHollowButton
                                onText={'Joined'}
                                offText={'Join'}
                                isOn={result.alreadyJoined}
                                onClick={() => onCommunitiesFollowClick()} />
                        )
                    }
                    <Box
                        px={'14px'}
                        py={'3px'}
                        bg={"rgba(228, 239, 255, 1)"}
                        borderRadius={'6px'}
                        fontSize={"9px"}
                        lineHeight={'10.42px'}
                        fontWeight={400}
                        color={"brand.400"}>
                        {type === SEARCH_RESULT_TYPES.USER ?
                            formatNumberItemString(result.followerCount ? result.followerCount : 0, "follower")
                            :
                            formatNumberItemString(result.memberCount ? result.memberCount : 0, "member")
                        }
                    </Box>
                </Flex>
            </EntityCard>
        </>
    );
};

export default IndividualSearchResult;