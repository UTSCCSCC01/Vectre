import NavBar from "./NavBar";
import { ReactComponent as LandingRect } from '../../assets/icons/landing-rect.svg'
import {Box, useToast} from '@chakra-ui/react'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLoggedInUser} from "../../redux/actions/users";
import {toastSelector} from "../../redux/selectors/toast";
import {deleteToast} from "../../redux/actions/toast";

const AppWrapper = ({
    ...otherProps
}) => {
    const dispatch = useDispatch()
    const createToast = useToast()
    const toast = useSelector(toastSelector)
    useEffect(() => {
        dispatch(getLoggedInUser())

        // Toast
        if (toast.status !== "" && toast.message !== "") {
            createToast({
                description: toast.message,
                status: toast.status,
                position: "bottom",
                isClosable: true
            })
            dispatch(deleteToast())
        }
    }, [toast])

    return (
        <Box>
            <Box
                bg={"linear-gradient(180deg, #E4EFFF 0%, rgba(228, 239, 255, 0.6) 92.51%, rgba(228, 239, 255, 0.6) 100%)"}
                minHeight={'100vh'}>
                <Box position={"absolute !important"} zIndex={"-1"} right={"0"} display={{ base: 'none', lg: 'block' }}>
                    <LandingRect />
                </Box>
                <Box>
                    <NavBar />
                    {otherProps.children}
                </Box>
            </Box>
        </Box>
    );
};

export default AppWrapper;