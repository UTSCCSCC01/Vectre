import ContentWithSideButtons from "../../components/Containers/ContentWithSideButtons";
import ProfileCommunityDetails from "./ProfileCommunityDetails/ProfileCommunityDetails"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { communitySelector, loggedInUserRolesSelector } from "../../redux/selectors/community";
import { getCommunity, getRolesOfLoggedInUser } from "../../redux/actions/community";

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

    return (
        <>
            <base href={`/c/${communityID}/`} />
            <ContentWithSideButtons sideButtonsList={loggedInUserRoles.includes("member") ? communitySideButtonsList(
                !loggedInUserRoles.includes("moderator")
            ) : []}>
                <ProfileCommunityDetails communityData={communityData} />
            </ContentWithSideButtons>
        </>
    )
}

export default Community;