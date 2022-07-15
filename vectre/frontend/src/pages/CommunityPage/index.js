import React from 'react'
import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import Community from "../../components/Community/Community";
import { useParams } from "react-router-dom";

const CommunityPage = () => {
    const { communityID } = useParams() // Get communityID from URL
    return (
        <ContentWIthNavContainer>
            <Community communityID={communityID} />
        </ContentWIthNavContainer>
    );
};

export default CommunityPage;
