import React, { useEffect, useState } from 'react'
import {
    Box, Button,
    Flex, Spacer, Stack
} from "@chakra-ui/react";
import SearchResultContainer from '../../components/Search/SearchResult/SearchResult';
import { useDispatch, useSelector } from "react-redux";
import SearchForm from './SearchForm/SearchForm';
import HeaderAndFilter from '../HeaderAndFilter/HeaderAndFilter';
import {searchUsers, searchCommunities, searchPosts, clearSearchedPosts} from "../../redux/actions/search";
import {
    searchedUsersSelector,
    searchedCommunitiesSelector,
    searchedPostsSelector,

    searchedPostsIndexSelector,
    searchedPostsPaginationCompleteSelector,
    searchedPostsSortTypeSelector
} from "../../redux/selectors/search";
import PostComponent from "../PostComponent/PostComponent";
import {showLoading} from "../../redux/actions/global";

const Search = () => {
    const dispatch = useDispatch()
    const searchedUsers = useSelector(searchedUsersSelector)
    const searchedCommunities = useSelector(searchedCommunitiesSelector)
    const searchedPosts = useSelector(searchedPostsSelector)

    const [searchInput, setSearchInput] = useState(".*")

    // Posts pagination
    const searchedPostsIndex = useSelector(searchedPostsIndexSelector)
    const searchedPostsPaginationComplete = useSelector(searchedPostsPaginationCompleteSelector)
    const searchedPostsSortType = useSelector(searchedPostsSortTypeSelector)

    function loadSearchedPosts(reset=false) {
        dispatch(searchPosts(searchInput, reset ? 0 : searchedPostsIndex, searchedPostsSortType, reset))
    }
    useEffect(() => {
        dispatch(showLoading(true))
        loadSearchedPosts()
    }, [searchedPostsSortType])

    // Search
    function handleSearchSubmit() {
        dispatch(clearSearchedPosts())

        dispatch(searchUsers(searchInput))
        dispatch(searchCommunities(searchInput))
        loadSearchedPosts(true)
    }
    useEffect(() => {
        handleSearchSubmit()
    }, [])

    function sortUsersAndCommunities(users, communities) {
        var arr = [...users, ...communities]
        arr.sort((a, b) => (b.communityID ? b.memberCount : b.followers) - (a.communityID ? a.memberCount : a.followers))
        return arr
    }

    return (
        <Flex
            flexDirection={'column'}
            gap={'20px'}>
            <SearchForm handleSearchSubmit={handleSearchSubmit} setSearchInput={setSearchInput} />

            <Spacer />

            <HeaderAndFilter text={'Users & Communities'} onClick={() => console.log("Peter Chow 🏴‍☠️")} />
            <SearchResultContainer results={sortUsersAndCommunities(searchedUsers, searchedCommunities)} />

            <HeaderAndFilter text={'Posts'} />
            <Stack gap={"10px"}>
                {searchedPosts.map((item, i) => {
                    return (
                        <Box key={i}>
                            <PostComponent item={item} fromSearch={true} />
                        </Box>
                    )
                })}
                {searchedPosts.length === searchedPostsIndex && !searchedPostsPaginationComplete ?
                    <Button onClick={() => loadSearchedPosts(false)}>Load more</Button>
                    : null}
            </Stack>
        </Flex>
    )
}

export default Search;