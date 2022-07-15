import React, { useEffect, useState } from 'react'
import {
    Box,
    Input,
    FormControl
} from "@chakra-ui/react";
import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import TextButton from '../../components/Buttons/TextButton/TextButton';
import { HiSearch } from 'react-icons/hi';
import SearchResultContainer from '../../components/Containers/SearchResult';
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../redux/actions/users";
import { searchCommunities } from "../../redux/actions/communities";
import { searchedUsersSelector } from "../../redux/selectors/users";
import { searchedCommunitiesSelector } from "../../redux/selectors/communities";

const SearchPage = () => {
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
        <ContentWIthNavContainer>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <form
                    id="search-form"
                    onSubmit={(event) => {
                        event.preventDefault()
                        handleSearchSubmit();
                    }}
                >
                    <FormControl>
                        <Input
                            id={'search'}
                            backgroundColor={"white"}
                            px={'17.5px'}
                            fontSize={'18px'}
                            fontWeight={700}
                            color={'primary.400'}
                            placeholder={"Looking For Something?"}
                            _placeholder={{ color: "primary.400" }}
                            borderRadius={'6px'}
                            onChange={(event) => { setSearchInput(event.target.value === "" ? ".*" : event.target.value) }} />
                    </FormControl>
                    <Box display={"flex"} flexDirection={"column"}>
                        <TextButton
                            type={'submit'}
                            form={'search-form'}
                            color={"white"}
                            bg={"primary.400"}
                            fontSize={"18px"}
                            px={"24px"}
                            py={"1px"}
                            mt={"15px"}
                            mb={"15px"}
                            fontWeight={700}
                            alignSelf={"flex-end"}
                            text={"Search"}
                            rightIcon={<HiSearch />} />
                    </Box>
                </form>
                <SearchResultContainer results={[...searchedUsers, ...searchedCommunities]} />
            </Box>
        </ContentWIthNavContainer>
    );
};

export default SearchPage;
