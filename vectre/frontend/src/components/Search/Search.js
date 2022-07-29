import React, { useEffect, useState } from 'react'
import {
    Box,
    Flex,
    Spacer,
    Stack
} from "@chakra-ui/react";
import SearchResultContainer from '../../components/Search/SearchResult/SearchResult';
import { useDispatch, useSelector } from "react-redux";
import SearchForm from './SearchForm/SearchForm';
import HeaderAndFilter from '../HeaderAndFilter/HeaderAndFilter';
import {
    searchUsers,
    searchCommunities,
    searchPosts,
    clearSearchedPosts,
    storeSearchedUsersCommunitiesFilter,
    storeSearchedPostsSortType
} from "../../redux/actions/search";
import {
    searchedUsersSelector,
    searchedCommunitiesSelector,
    searchedPostsSelector,

    searchedPostsIndexSelector,
    searchedPostsPaginationCompleteSelector,
    searchedPostsSortTypeSelector,
    searchedUserCommunitiesFilterSelector
} from "../../redux/selectors/search";
import PostComponent from "../PostComponent/PostComponent";
import { showLoading } from "../../redux/actions/global";
import TextButton from '../Buttons/TextButton/TextButton';
import GenericButtonsPopoverWrapper from '../Containers/GenericButtonsPopoverWrapper'
import { RiHeart2Fill } from 'react-icons/ri';
import { AiFillClockCircle } from 'react-icons/ai';
import { FaUser, FaUsers } from 'react-icons/fa';
import {POSTS_SORT_TYPE, USERS_COMMUNITIES_FILTER} from "../../redux/constants/search";

const Search = () => {
    const dispatch = useDispatch()
    const searchedUsers = useSelector(searchedUsersSelector)
    const searchedCommunities = useSelector(searchedCommunitiesSelector)
    const searchedPosts = useSelector(searchedPostsSelector)

    const [searchInput, setSearchInput] = useState(".*")

    // Filter/sort
    const searchedUserCommunitiesFilter = useSelector(searchedUserCommunitiesFilterSelector)
    function updateSearchedUserCommunitiesFilter(sortType) {
        dispatch(storeSearchedUsersCommunitiesFilter(sortType))
    }
    const searchedPostsSortType = useSelector(searchedPostsSortTypeSelector)
    function updateSearchedPostsSortType(sortType) {
        dispatch(storeSearchedPostsSortType(sortType))
    }

    // Posts pagination
    const searchedPostsIndex = useSelector(searchedPostsIndexSelector)
    const searchedPostsPaginationComplete = useSelector(searchedPostsPaginationCompleteSelector)
    function loadSearchedPosts(reset = false) {
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

    function getUsersAndCommunitiesHeader() {
        switch (searchedUserCommunitiesFilter) {
            case USERS_COMMUNITIES_FILTER.USERS:
                return "Users"
            case USERS_COMMUNITIES_FILTER.COMMUNITIES:
                return "Communities"
            case USERS_COMMUNITIES_FILTER.ALL:
            default:
                return "Users & Communities"
        }
    }
    function getUsersAndCommunitiesResults() {
        switch (searchedUserCommunitiesFilter) {
            case USERS_COMMUNITIES_FILTER.USERS:
                return searchedUsers
            case USERS_COMMUNITIES_FILTER.COMMUNITIES:
                return searchedCommunities
            case USERS_COMMUNITIES_FILTER.ALL:
                return sortUsersAndCommunities(searchedUsers, searchedCommunities)
            default:
                return []
        }
    }
    function sortUsersAndCommunities(users, communities) {
        var arr = [...users, ...communities]
        arr.sort((a, b) => (b.communityID ? b.memberCount : b.followers) - (a.communityID ? a.memberCount : a.followers))
        return arr
    }

    const userCommunitiesButtonsList = [
        {
            typeData: {
                title: "All",
                icon: <RiHeart2Fill size={'1.2rem'} />
            },
            onClick: () => updateSearchedUserCommunitiesFilter(USERS_COMMUNITIES_FILTER.ALL)
        },
        {
            typeData: {
                title: "Users",
                icon: <FaUser size={'1.1rem'} />
            },
            onClick: () => updateSearchedUserCommunitiesFilter(USERS_COMMUNITIES_FILTER.USERS)
        },
        {
            typeData: {
                title: "Communities",
                icon: <FaUsers size={'1.2rem'} />
            },
            onClick: () => updateSearchedUserCommunitiesFilter(USERS_COMMUNITIES_FILTER.COMMUNITIES)
        }
    ]

    const postsButtonsList = [
        {
            typeData: {
                title: "Likes",
                icon: <RiHeart2Fill size={'1.2rem'} />
            },
            onClick: () => updateSearchedPostsSortType(POSTS_SORT_TYPE.LIKES)
        },
        {
            typeData: {
                title: "Newest",
                icon: <AiFillClockCircle size={'1.2rem'} />
            },
            onClick: () => updateSearchedPostsSortType(POSTS_SORT_TYPE.TIMESTAMP)
        }
    ]

    return (
        <Flex
            flexDirection={'column'}
            gap={'20px'}>
            <SearchForm handleSearchSubmit={handleSearchSubmit} setSearchInput={setSearchInput} />

            <Spacer />

            <GenericButtonsPopoverWrapper
                placement={'right-start'}
                margin={'0 0 0 20px'}
                color={'primary.400'}
                buttons={
                    <>
                        {userCommunitiesButtonsList.map((element, i) => (
                            <TextButton
                                key={i}
                                height={'fit-content'}
                                py={'5px'}
                                width={'100%'}
                                color={'primary.400'}
                                fontSize={'13px'}
                                fontWeight={500}
                                bg={'rgba(228, 239, 255, 0.62)'}
                                text={element.typeData.title}
                                onClick={(e) => {
                                    element.onClick();
                                    e.stopPropagation();
                                }}
                                rightIcon={element.typeData.icon} />
                        ))}
                    </>}>
                <HeaderAndFilter text={getUsersAndCommunitiesHeader()} />
            </GenericButtonsPopoverWrapper>
            <SearchResultContainer results={getUsersAndCommunitiesResults()} />

            <GenericButtonsPopoverWrapper
                placement={'right-start'}
                margin={'0 0 0 20px'}
                color={'primary.400'}
                buttons={
                    <>
                        {postsButtonsList.map((element, i) => (
                            <TextButton
                                key={i}
                                height={'fit-content'}
                                py={'5px'}
                                width={'100%'}
                                color={'primary.400'}
                                fontSize={'13px'}
                                fontWeight={500}
                                bg={'rgba(228, 239, 255, 0.62)'}
                                text={element.typeData.title}
                                onClick={(e) => {
                                    element.onClick();
                                    e.stopPropagation();
                                }}
                                rightIcon={element.typeData.icon} />
                        ))}
                    </>}>
                <HeaderAndFilter text={'Posts'} />
            </GenericButtonsPopoverWrapper>
            <Stack gap={"10px"}>
                {searchedPosts.map((item, i) => {
                    return (
                        <Box key={i}>
                            <PostComponent item={item} fromSearch={true} />
                        </Box>
                    )
                })}
                {searchedPosts.length === searchedPostsIndex && !searchedPostsPaginationComplete ?
                    <Flex
                        justifyContent={'center'}
                        alignItems={'center'}
                        height={'80px'}
                    >
                        <TextButton
                            text={'Load more'}
                            onClick={() => loadSearchedPosts(false)} />
                    </Flex>
                    : null}
            </Stack>
        </Flex>
    )
}

export default Search;