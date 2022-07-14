import ContentWithSideButtons from "../../components/Containers/ContentWithSideButtons";
import ProfileCommunityDetails from "./ProfileCommunityDetails/ProfileCommunityDetails"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { communitySelector } from "../../redux/selectors/community";
import { getCommunity } from "../../redux/actions/community";

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
    const communityData = useSelector(communitySelector)
    useEffect(() => {
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