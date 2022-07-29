import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import TextButton from "../../Buttons/TextButton/TextButton";
import IndividualSearchResult from "../IndividualSearchResult/IndividualSearchResult"

const SearchResultContainer = ({
    results
}) => {
    const SLICE_AMT = 4;
    const [isSliced, setIsSliced] = useState(true);

    useEffect(() => {
        if (results.length !== 0) {
            setIsSliced(results.length > SLICE_AMT)
        }
    }, [results.length])

    return (
        <>
            <Box width={"100%"} display={"grid"} gridTemplateColumns={"1fr 1fr"} gridGap="24px">
                {results.map((result, i) => {
                    return (
                        <IndividualSearchResult key={i} result={result} />
                    )
                }).slice(0, isSliced ? SLICE_AMT : results.length)}
            </Box>
            <TextButton
                display={isSliced ? 'initial' : 'none'}
                height={'unset'}
                fontSize={'14px'}
                fontWeight={700}
                lineHeight={'18.23px'}
                py={'5px'}
                alignSelf={'center'}
                width={'150px'}
                bg={'rgba(255, 255, 255, 0.36)'}
                text={'View All'}
                onClick={() => {
                    setIsSliced(false);
                }} />
        </>
    )
};

export default SearchResultContainer;