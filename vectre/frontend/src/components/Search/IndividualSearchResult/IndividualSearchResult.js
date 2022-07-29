import { useDispatch, useSelector } from "react-redux";
import { cutText } from "../../../utils/Utils";
import ToggleHollowButton from "../../Buttons/ToggleHollowButton/ToggleHollowButton";
import { joinCommunity, leaveCommunity } from "../../../redux/actions/communities";
import React from "react";
import { followUser, unfollowUser } from "../../../redux/actions/users";
import { loggedInUserSelector } from "../../../redux/selectors/users";
import EntityCard from "../../EntityCard/EntityCard";
import {
    doFollowSearchedUsers,
    doJoinSearchedCommunities,
    doLeaveSearchedCommunities,
    doUnfollowSearchedUsers
} from "../../../redux/actions/search";

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

    return (
        <>
            <EntityCard
                primaryText={cutText(result.name, 20)}
                secondaryText={type === SEARCH_RESULT_TYPES.USER ? "@" + result.username : "< " + result.communityID + " >"}
                // tertiaryText={cutText(result.bio, 40)}
                data={result}
                href={result.communityID ? `/c/${result.communityID}` : `/user/${result.walletAddress}`}>
                {
                    type === SEARCH_RESULT_TYPES.USER ? (
                        loggedInUser && loggedInUser.walletAddress !== result.walletAddress ?
                            <ToggleHollowButton
                                alignSelf={'flex-start'}
                                mt={'10px'}
                                onText={'Following'}
                                offText={'Follow'}
                                isOn={result.alreadyFollowed}
                                onClick={() => onUsersFollowClick()} />
                            : null
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
            </EntityCard>
        </>
    );
};

export default IndividualSearchResult;