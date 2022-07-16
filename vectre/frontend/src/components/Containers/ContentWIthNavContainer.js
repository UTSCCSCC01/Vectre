import NavBar from "./NavBar";
import { ReactComponent as LandingRect } from '../../assets/icons/landing-rect.svg'
import {
    Box,
    Spinner,
    Flex
} from '@chakra-ui/react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser, getFunds } from "../../redux/actions/users";
import ToastContainer from "./ToastContainer";
import {loadingSelector} from "../../redux/selectors/global";

const ContentWIthNavContainer = ({
    ...otherProps
}) => {
    const isLoading = useSelector(loadingSelector);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLoggedInUser())
        dispatch(getFunds())
    }, [])

    return (
        <ToastContainer>
            <Box>
                <Box
                    bg={"linear-gradient(180deg, #E4EFFF 0%, rgba(228, 239, 255, 0.6) 92.51%, rgba(228, 239, 255, 0.6) 100%)"}
                    minHeight={'100vh'}>
                    <Box position={"absolute !important"} zIndex={"-1"} right={"0"} display={{ base: 'none', lg: 'block' }}>
                        <LandingRect />
                    </Box>
                    <Box>
                        <NavBar />
                        {isLoading ?
                            (
                                <Flex
                                    height={'80vh'}
                                    position={'fixed'}
                                    right={'50%'}
                                    alignItems={'center'}
                                    justifyContent={'center'}>
                                    <Spinner
                                        thickness='3px'
                                        speed='0.65s'
                                        emptyColor='white'
                                        color='primary.400'
                                        size='xl'
                                    />
                                </Flex>
                            ) : <></>
                        }
                        <Box
                            visibility={isLoading ? 'hidden' : 'visible'}>
                            {otherProps.children}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ToastContainer>
    );
};

export default ContentWIthNavContainer;