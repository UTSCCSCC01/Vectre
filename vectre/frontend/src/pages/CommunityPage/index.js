import React from 'react'
import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import Community from "../../components/Community/Community";
import { useParams } from "react-router-dom";

const CommunityPage = () => {
    const { communityName } = useParams() // Get communityName from URL
    return (
        <ContentWIthNavContainer>
            <Community communityName={communityName} />
        </ContentWIthNavContainer>
    );
};

export default CommunityPage;
