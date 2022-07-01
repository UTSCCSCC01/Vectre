import {useToast} from '@chakra-ui/react'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toastSelector} from "../../redux/selectors/toast";
import {clearToast} from "../../redux/actions/toast";

const ToastContainer = ({
    ...otherProps
}) => {
    const dispatch = useDispatch()
    const createToast = useToast()
    const toast = useSelector(toastSelector)
    useEffect(() => {
        if (toast.status !== "" && toast.message !== "") {
            createToast({
                description: toast.message,
                status: toast.status,
                position: "bottom",
                isClosable: true
            })
            dispatch(clearToast())
        }
    }, [toast])

    return (<div>{otherProps.children}</div>)
};

export default ToastContainer;