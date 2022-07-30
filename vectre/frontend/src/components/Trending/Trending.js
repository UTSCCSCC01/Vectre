import React, { useEffect, useState } from 'react'
import SearchResultContainer from "../Search/SearchResult/SearchResult";
import {useDispatch, useSelector} from "react-redux";
import {trendingCommunitiesSelector} from "../../redux/selectors/trending";
import {getTrendingCommunities} from "../../redux/actions/trending";

const Trending = () => {
    const trendingCommunities = useSelector(trendingCommunitiesSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTrendingCommunities())
    }, [])


    return (
        <SearchResultContainer results={trendingCommunities} />
    )
}

export default Trending