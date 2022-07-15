import { BsGlobe } from "react-icons/bs";
import { Box } from "@chakra-ui/react"
import IndividualSearchResult from "../IndividualSearchResult/IndividualSearchResult"

const SearchResultContainer = ({
    results
}) => {


    return (
        <>
            <Box
                bg={"#FFFFFFAB"}
                gap={"5px"}
                borderRadius={"6px"}
                px={"24px"}
                py={"1px"}
                padding={"10px 25px"}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={"23px"}
                fontFamily={"DM Sans"}
                fontWeight={700}
                color={"sub.400"}>
                Explore All
                <BsGlobe />
            </Box>
            <br />
            <Box width={"100%"} display={"grid"} gridTemplateColumns={"1fr 1fr"} gridGap="24px">
                {results.map((result, i) => {
                    return (
                        <IndividualSearchResult key={i} result={result} />
                    )
                })}
            </Box>
        </>
    )
};

export default SearchResultContainer;