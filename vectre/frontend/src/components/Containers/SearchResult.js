import {BsGlobe} from "react-icons/bs"; 
import {Box} from "@chakra-ui/react"
import IndividualSearchResult from "../IndividualSearchResult/IndividualSearchResult"

const SearchResultContainer = ({
    listOfResults
}) => {
    

    return(
    <>
        <Box bg={"#FFFFFFAB"} gap={"5px"} borderRadius={"6px"} px={"24px"} py={"1px"} padding={"10px 25px"} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} fontSize={"23px"} fontFamily={"DM Sans"} fontWeight={700} color={"#697B98"}>
                Explore All
                <BsGlobe />
        </Box>
        <Box width={"100%"} display={"grid"} gridTemplateColumns={"1fr 1fr"} gridGap="24px">
            <IndividualSearchResult/>
            <IndividualSearchResult/>
            <IndividualSearchResult/>
        </Box>
    </>
    )
};

export default SearchResultContainer;