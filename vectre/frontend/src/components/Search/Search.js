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
import { searchUsers, searchCommunities, searchPosts, clearSearchedPosts } from "../../redux/actions/search";
import {
    searchedUsersSelector,
    searchedCommunitiesSelector,
    searchedPostsSelector,

    searchedPostsIndexSelector,
    searchedPostsPaginationCompleteSelector,
    searchedPostsSortTypeSelector
} from "../../redux/selectors/search";
import PostComponent from "../PostComponent/PostComponent";
import { showLoading } from "../../redux/actions/global";
import TextButton from '../Buttons/TextButton/TextButton';
import GenericButtonsPopoverWrapper from '../Containers/GenericButtonsPopoverWrapper'
import { RiHeart2Fill } from 'react-icons/ri';
import { AiFillClockCircle } from 'react-icons/ai';
import { FaUser, FaUsers } from 'react-icons/fa';

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
            onClick: () => console.log("sorting by all")
        },
        {
            typeData: {
                title: "User",
                icon: <FaUser size={'1.1rem'} />
            },
            onClick: () => console.log("sorting by user")
        },
        {
            typeData: {
                title: "Communities",
                icon: <FaUsers size={'1.2rem'} />
            },
            onClick: () => console.log("sorting by communities")
        }
    ]

    const postsButtonsList = [
        {
            typeData: {
                title: "Likes",
                icon: <RiHeart2Fill size={'1.2rem'} />
            },
            onClick: () => console.log("sorting by likes")
        },
        {
            typeData: {
                title: "Newest",
                icon: <AiFillClockCircle size={'1.2rem'} />
            },
            onClick: () => console.log("sorting by newest")
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
                <HeaderAndFilter text={'Users & Communities'} />
            </GenericButtonsPopoverWrapper>
            <SearchResultContainer results={sortUsersAndCommunities(searchedUsers, searchedCommunities)} />

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