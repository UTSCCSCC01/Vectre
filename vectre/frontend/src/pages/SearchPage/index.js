import React from 'react'
import {
    Box,
    Input
} from "@chakra-ui/react";
import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import TextButton from '../../components/Buttons/TextButton/TextButton';
import  {HiSearch} from 'react-icons/hi';
import SearchResultContainer from '../../components/Containers/SearchResult';

const SearchPage = () => {
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
                    <TextButton rightIcon={<HiSearch/>} color={"white"} bg={"primary.400"} px={"24"} py={"1"} text={"Search"} fontSize={"18px"} marginTop={"5px"} marginBottom={"30px"} fontWeight={700} display={"inline-flex"} flexDirection={"row"} alignSelf={"right"} />
                </form>
                <SearchResultContainer/>
            </Box>
        </ContentWIthNavContainer>
    );
};

export default SearchPage;
