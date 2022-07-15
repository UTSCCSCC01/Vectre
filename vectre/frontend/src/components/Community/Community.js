import ContentWithSideButtons from "../../components/Containers/ContentWithSideButtons";
import ProfileCommunityDetails from "./ProfileCommunityDetails/ProfileCommunityDetails"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    communitySelector,
    loggedInUserRolesSelector,
    communityFeedSelector,
    communityFeedIndexSelector,
    communityFeedPaginationCompleteSelector,
    communityFeedSortTypeSelector,
} from "../../redux/selectors/community";
import {getCommunity, getCommunityFeed, getRolesOfLoggedInUser} from "../../redux/actions/community";
import {Box, Button} from "@chakra-ui/react";
import PostComponent from "../PostComponent/PostComponent";

const communitySideButtonsList = (userIsModerator) => [
    {
        hidden: userIsModerator,
        text: "Create a Proposal",
        func: () => { console.log("Creating a proposal...") }
    },
    {
        text: "Vote for a Proposal",
        func: () => { console.log("Voting for a proposal...") }
    },
    {
        hidden: userIsModerator,
        text: "Moderator Settings",
        link: "settings"
    },
    {
        text: "Announcements",
        func: () => { console.log("anouncements") }
    }
]

const Community = ({
    communityID
}) => {
    const dispatch = useDispatch();
    const communityData = useSelector(communitySelector)
    const loggedInUserRoles = useSelector(loggedInUserRolesSelector);

    useEffect(() => {
        dispatch(getRolesOfLoggedInUser(communityID));
        dispatch(getCommunity(communityID));
    }, []);


    const feed = useSelector(communityFeedSelector)
    const feedIndex = useSelector(communityFeedIndexSelector)
    const feedPaginationComplete = useSelector(communityFeedPaginationCompleteSelector)
    const feedSortType = useSelector(communityFeedSortTypeSelector)

    function loadFeed() {
        dispatch(getCommunityFeed(communityID, feedIndex, feedSortType))
    }
    useEffect(() => {
        loadFeed()
    }, [feedSortType])

    return (
        <>
            <base href={`/c/${communityID}/`} />
            <ContentWithSideButtons sideButtonsList={loggedInUserRoles.includes("member") ? communitySideButtonsList(
                !loggedInUserRoles.includes("moderator")
            ) : []}>
                <ProfileCommunityDetails communityData={communityData} />

                {feed.map((item, i) => {
                    return (
                        <Box key={i}>
                            <PostComponent item={item} fromFeed={true} />
                        </Box>
                    )
                })}
                {feed.length === feedIndex && !feedPaginationComplete ?
                    <Button onClick={loadFeed}>Load more</Button>
                    : null}
            </ContentWithSideButtons>
        </>
    )
}

export default Community;