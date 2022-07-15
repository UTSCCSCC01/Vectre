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
        <br />
        <Box width={"100%"} display={"grid"} gridTemplateColumns={"1fr 1fr"} gridGap="24px">
            <IndividualSearchResult username = {"123"}/>
            <IndividualSearchResult username = {"124"}/>
            <IndividualSearchResult username = {"125"}/>
            <IndividualSearchResult username = {"126"}/>
            <IndividualSearchResult username = {"127"}/>
        </Box>
    </>
    )
};

export default SearchResultContainer;