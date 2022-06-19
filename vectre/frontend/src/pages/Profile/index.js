import React from 'react'
import {
    Box,
} from "@chakra-ui/react";
import AppWrapper from "../../components/AppWrapper/AppWrapper";
import Profile from "../../components/Profile/Profile";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const { wallet_address } = useParams() // Get wallet_address from URL
    return (
        <AppWrapper>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <Profile profileWalletAddress={wallet_address} />
            </Box>
        </AppWrapper>
    );
};

export default ProfilePage;
