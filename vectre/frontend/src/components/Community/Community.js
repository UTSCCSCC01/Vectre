import ContentWithSideButtons from "../../components/Containers/ContentWithSideButtons";
import ProfileCommunityDetails from "./ProfileCommunityDetails/ProfileCommunityDetails"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { communitySelector } from "../../redux/selectors/community";
import { getCommunity, getRolesOfLoggedInUser } from "../../redux/actions/community";
import { loggedInUserSelector } from "../../redux/selectors/users";
import { getLoggedInUser } from "../../redux/actions/users";

const communitySideButtonsList = [
    {
        text: "Create a Proposal",
        func: () => { console.log("Creating a proposal...") }
    },
    {
        text: "Vote for a Proposal",
        func: () => { console.log("Voting for a proposal...") }
    },
    {
        text: "Moderator Settings",
        link: "settings"
    }
]

const Community = ({
    communityID
}) => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(loggedInUserSelector);
    const communityData = useSelector(communitySelector)
    useEffect(() => {
        dispatch(getLoggedInUser());
        dispatch(getRolesOfLoggedInUser(communityID, loggedInUser.walletAddress));
        dispatch(getCommunity(communityID));
    }, []);

    return (
        <>
            <base href={`/c/${communityID}/`} />
            <ContentWithSideButtons sideButtonsList={communitySideButtonsList}>
                <ProfileCommunityDetails communityData={communityData} />
            </ContentWithSideButtons>
        </>
    )
}

export default Community;