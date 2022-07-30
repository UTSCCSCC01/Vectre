import React  from 'react'
import {
  Box,
} from "@chakra-ui/react";
import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import Trending from "../../components/Trending/Trending";

const TrendingPage = () => {
    return (
        <ContentWIthNavContainer>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <Trending />
            </Box>
        </ContentWIthNavContainer>
    );
}

export default TrendingPage;
