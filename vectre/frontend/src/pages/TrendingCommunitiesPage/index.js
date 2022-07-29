import React, { useEffect } from 'react'
import {
  Box,
} from "@chakra-ui/react";
import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import {trendingCommunitiesSelector} from "../../redux/selectors/communities";
import {useDispatch, useSelector} from "react-redux";
import SearchResultContainer from "../../components/Containers/SearchResult";
import {getTrendingCommunities} from "../../redux/actions/communities";

const TrendingCommunitiesPage = () => {
    const trendingCommunities = useSelector(trendingCommunitiesSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTrendingCommunities())
    }, [])

    return (
        <ContentWIthNavContainer>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <SearchResultContainer results={trendingCommunities} />
            </Box>
        </ContentWIthNavContainer>
    );
}

export default TrendingCommunitiesPage;
