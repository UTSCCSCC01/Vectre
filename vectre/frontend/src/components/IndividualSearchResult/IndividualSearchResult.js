import {
    Box
} from '@chakra-ui/react';
// import { useDispatch } from 'react-redux';
import profilePic from "../../assets/images/default_profile_pic.jpg"

const IndividualSearchResult = ({
    result
}) => {
    // const dispatch = useDispatch();
    return (
        <Box marginTop={"20px"}>
            <Box padding={"10px"} width={"100%"} height={"119px"} borderRadius={"6px"} bg={"#FFFFFF"} justifyContent={"center"} display={"flex"} flexDirection={"row"}>
                <Box backgroundImage={profilePic} background={"cover"} display={"flex"} alignItems={"center"} width={"120px"} height={"120px"} borderRadius={"50%"} />
            </Box>
            
            <br />
            <Box width={"100%"} height={"82px"} borderRadius={"6px"} bg={"#FFFFFF"} alignContent={"center"}>
                Hello
            </Box>
        </Box>
    );
};

export default IndividualSearchResult;