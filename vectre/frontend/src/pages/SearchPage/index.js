import {
    Box
} from "@chakra-ui/react";
import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import Search from "../../components/Search/Search";

const SearchPage = () => {
    return (
        <ContentWIthNavContainer>
            <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                <Search />
            </Box>
        </ContentWIthNavContainer>
    );
};

export default SearchPage;
