import { Box } from "@chakra-ui/react"
import IndividualSearchResult from "../IndividualSearchResult/IndividualSearchResult"

const SearchResultContainer = ({
    results
}) => {
    return (
        <>
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