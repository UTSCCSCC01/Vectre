import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { trendingUsersSelector, trendingCommunitiesSelector } from "../../redux/selectors/trending";
import { getTrendingUsers, getTrendingCommunities } from "../../redux/actions/trending";
import { Box, Flex, Spacer } from "@chakra-ui/react";
import { HiTrendingUp } from "react-icons/hi";
import IndividualSearchResult from '../Search/IndividualSearchResult/IndividualSearchResult';

const Trending = () => {
    const trendingUsers = useSelector(trendingUsersSelector)
    const trendingCommunities = useSelector(trendingCommunitiesSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTrendingUsers())
        dispatch(getTrendingCommunities())
    }, [])


    return (
        <Flex
            flexDirection={'column'}
            gap={'40px'}>
            <Box
                bg={"white"}
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
                color={"primary.400"}>
                Trending
                <HiTrendingUp />
            </Box>
            <Box width={"100%"} display={"grid"} gridTemplateColumns={"1fr 1fr"} gridGap="24px" maxHeight={'456px'}>
                <Box
                    bg={'white'}
                    px={'28px'}
                    py={'18px'}>
                    <Box
                        textAlign={'center'}
                        color={'brand.400'}
                        bg={'rgba(228, 239, 255, 1)'}
                        py={'7.5px'}
                        width={'100%'}
                        borderRadius={'6px'}
                        fontWeight={700}
                        fontSize={'17px'}
                        lineHeight={'22.13px'}
                        mb={'28px'}>
                        Top Growing Communities
                    </Box>
                    <Flex
                        flexDirection={'column'}
                        gap={'22px'}>
                        {trendingCommunities.map((result, i) => {
                            return (
                                <IndividualSearchResult bg={'rgba(198, 219, 255, 0.11)'} key={i} result={result} trending={true} />
                            )
                        })}
                    </Flex>
                </Box>
                <Flex
                    flexDirection={'column'}
                    gap={'22px'}>
                    {trendingUsers.map((result, i) => {
                        return (
                            <IndividualSearchResult key={i} result={result} trending={true} />
                        )
                    })}
                </Flex>
            </Box>
        </Flex>

    )
}

export default Trending