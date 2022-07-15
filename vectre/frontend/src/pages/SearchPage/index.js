import React, {useEffect} from 'react'
import {
    Box,
    Input
} from "@chakra-ui/react";
import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import TextButton from '../../components/Buttons/TextButton/TextButton';
import  {HiSearch} from 'react-icons/hi';
import SearchResultContainer from '../../components/Containers/SearchResult';
import {useDispatch, useSelector} from "react-redux";
import {searchUsers} from "../../redux/actions/users";
import {searchCommunities} from "../../redux/actions/communities";
import {searchedUsersSelector} from "../../redux/selectors/users";
import {searchedCommunitiesSelector} from "../../redux/selectors/communities";

const SearchPage = () => {
    const searchedUsers = useSelector(searchedUsersSelector)
    const searchedCommunities = useSelector(searchedCommunitiesSelector)
    const dispatch = useDispatch()

    const searchInput = "Doo" // TODO: Replace with text field input

    function handleSearchSubmit() { // TODO: Call on form submit
        dispatch(searchUsers(searchInput))
        dispatch(searchCommunities(searchInput))
    }

    return (
        <ContentWIthNavContainer>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <form>
                    <Input backgroundColor={"#FFFFFF"} 
                            px={'17.5px'}
                            fontSize={'18px'}
                            fontWeight={700}
                            color={'primary.400'}
                            bg={'white'} 
                            placeHolder={"Looking For Something?"}>
                            </Input>
                    <Box display={"flex"} flexDirection={"column"}>
                        <TextButton
                            rightIcon={<HiSearch/>}
                            color={"white"}
                            bg={"primary.400"}
                            px={"24"}
                            py={"1"}
                            fontSize={"18px"}
                            marginTop={"5px"}
                            marginBottom={"30px"}
                            fontWeight={700}
                            alignSelf={"flex-end"}
                            text={"Search"} />
                    </Box>
                </form>    
                <SearchResultContainer/>
            </Box>
        </ContentWIthNavContainer>
    );
};

export default SearchPage;
