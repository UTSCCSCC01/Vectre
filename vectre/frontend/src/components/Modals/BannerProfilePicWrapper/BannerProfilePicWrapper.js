import {
    Flex,
    Box,
    Image
} from "@chakra-ui/react"
import { getAvatarOrDefault, getBannerOrDefault } from "../../../utils/Utils";

const BannerProfilePicWrapper = ({
    data,
    ...otherProps
}) => {
    return (
        <Flex
            flexDirection={'column'}
            gap={'20px'}
            position={'relative'}>
            <Box
                position={'absolute'}
                top={'53%'}
                left={'50%'}
                marginLeft={'-60px'}>
                <Image
                    border={'5px solid white'}
                    bg={'white'}
                    src={getAvatarOrDefault(data.profilePic)}
                    fit={'cover'}
                    overflow={'hidden'}
                    borderRadius={'full'}
                    boxSize={'120px'} />
            </Box>
            <Image
                bg={'white'}
                src={getBannerOrDefault(data.banner)}
                fit={'cover'}
                overflow={'hidden'}
                borderRadius={'6px'}
                height={'200px'} />
            {otherProps.children}
        </Flex>
    )
}

export default BannerProfilePicWrapper;