import {useToast} from '@chakra-ui/react'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toastSelector} from "../../redux/selectors/global";
import {clearToast} from "../../redux/actions/global";

const ToastContainer = ({
    ...otherProps
}) => {
    const dispatch = useDispatch()
    const createToast = useToast()
    const toast = useSelector(toastSelector)
    useEffect(() => {
        if (toast && toast.status !== "" && toast.message !== "") {
            createToast({
                status: toast.status,
                description: toast.message,
                position: "bottom",
                isClosable: true
            })
            dispatch(clearToast())
        }
    }, [toast])

    return (<div>{otherProps.children}</div>)
};

export default ToastContainer;