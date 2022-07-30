import React, { useEffect, useState } from 'react'
import SearchResultContainer from "../Search/SearchResult/SearchResult";
import {useDispatch, useSelector} from "react-redux";
import {trendingCommunitiesSelector} from "../../redux/selectors/trending";
import {getTrendingCommunities} from "../../redux/actions/trending";
import {Box} from "@chakra-ui/react";

const Trending = () => {
    const trendingCommunities = useSelector(trendingCommunitiesSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTrendingCommunities())
    }, [])


    return (
        <>
            <Box
                bg={"#FFFFFFAB"}
                gap={"5px"}
                borderRadius={"6px"}
                px={"24px"}
                py={"1px"}
                padding={"10px 25px"}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={"23px"}
                fontFamily={"DM Sans"}
                fontWeight={700}
                color={"primary.400"}>
                Trending
                {/*<BsGlobe />*/}
            </Box>
            <br />
            {/*<Box width={"100%"} display={"grid"} gridTemplateColumns={"1fr 1fr"} gridGap="24px">*/}
            {/*    {results.map((result, i) => {*/}
            {/*        return (*/}
            {/*            <IndividualSearchResult key={i} result={result} />*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</Box>*/}

            <SearchResultContainer results={trendingCommunities} />
        </>

    )
}

export default Trending