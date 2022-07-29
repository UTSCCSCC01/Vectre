import React, { useEffect, useState } from 'react'
import {
    Box, Button,
    Flex, Spacer, Stack
} from "@chakra-ui/react";
import SearchResultContainer from '../../components/Search/SearchResult/SearchResult';
import { useDispatch, useSelector } from "react-redux";
import SearchForm from './SearchForm/SearchForm';
import HeaderAndFilter from '../HeaderAndFilter/HeaderAndFilter';
import {searchUsers, searchCommunities, searchPosts} from "../../redux/actions/search";
import {searchedUsersSelector, searchedCommunitiesSelector, searchedPostsSelector} from "../../redux/selectors/search";
import PostComponent from "../PostComponent/PostComponent";

const Search = () => {
    const searchedUsers = useSelector(searchedUsersSelector)
    const searchedCommunities = useSelector(searchedCommunitiesSelector)
    const searchedPosts = useSelector(searchedPostsSelector)
    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState(".*")

    function handleSearchSubmit() {
        dispatch(searchUsers(searchInput))
        dispatch(searchCommunities(searchInput))
        dispatch(searchPosts(searchInput))
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
            </Stack>
        </Flex>
    )
}

export default Search;