import React from 'react'
import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import Profile from "../../components/Profile/Profile";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const { walletAddress } = useParams() // Get walletAddress from URL
    return (
        <ContentWIthNavContainer>
            <Profile profileWalletAddress={walletAddress} />
        </ContentWIthNavContainer>
    );
};

export default ProfilePage;
