import React, { useEffect, useState } from 'react'
import SearchResultContainer from "../Search/SearchResult/SearchResult";
import {useDispatch, useSelector} from "react-redux";
import {trendingUsersSelector, trendingCommunitiesSelector} from "../../redux/selectors/trending";
import {getTrendingUsers, getTrendingCommunities} from "../../redux/actions/trending";
import {Box} from "@chakra-ui/react";
import {HiTrendingUp} from "react-icons/hi";

const Trending = () => {
    const trendingUsers = useSelector(trendingUsersSelector)
    const trendingCommunities = useSelector(trendingCommunitiesSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTrendingUsers())
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
                <HiTrendingUp />
            </Box>
            <br />
            {/*<Box width={"100%"} display={"grid"} gridTemplateColumns={"1fr 1fr"} gridGap="24px">*/}
            {/*    {results.map((result, i) => {*/}
            {/*        return (*/}
            {/*            <IndividualSearchResult key={i} result={result} />*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</Box>*/}

            <SearchResultContainer results={trendingUsers} />
            <SearchResultContainer results={trendingCommunities} />
        </>

    )
}

export default Trending