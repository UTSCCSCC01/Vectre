import React, { useEffect, useState } from 'react'
import {
    Flex, Spacer
} from "@chakra-ui/react";
import SearchResultContainer from '../../components/Search/SearchResult/SearchResult';
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../redux/actions/users";
import { searchCommunities } from "../../redux/actions/communities";
import { searchedUsersSelector } from "../../redux/selectors/users";
import { searchedCommunitiesSelector } from "../../redux/selectors/communities";
import SearchForm from './SearchForm/SearchForm';
import HeaderAndFilter from '../HeaderAndFilter/HeaderAndFilter';

const Search = () => {

    const searchedUsers = useSelector(searchedUsersSelector)
    const searchedCommunities = useSelector(searchedCommunitiesSelector)
    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState(".*")

    function handleSearchSubmit() {
        dispatch(searchUsers(searchInput))
        dispatch(searchCommunities(searchInput))
    }
    useEffect(() => {
        handleSearchSubmit()
    }, [])

    return (
        <Flex
            flexDirection={'column'}
            gap={'20px'}>
            <SearchForm handleSearchSubmit={handleSearchSubmit} setSearchInput={setSearchInput} />
            <Spacer />
            <HeaderAndFilter text={'Users & Communities'} onClick={() => console.log("HI!")} />
            <SearchResultContainer results={[...searchedUsers, ...searchedCommunities]} />
            <HeaderAndFilter text={'Posts'} />
        </Flex>
    )
}

export default Search;