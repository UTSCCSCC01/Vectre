import React from 'react'
import {
    Box,
} from "@chakra-ui/react";
import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import Profile from "../../components/Profile/Profile";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const { walletAddress } = useParams() // Get walletAddress from URL
    return (
        <ContentWIthNavContainer>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <Profile profileWalletAddress={walletAddress} />
            </Box>
        </ContentWIthNavContainer>
    );
};

export default ProfilePage;
