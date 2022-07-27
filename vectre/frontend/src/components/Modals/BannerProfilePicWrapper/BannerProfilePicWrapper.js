import {
    Flex,
    Box,
    Image
} from "@chakra-ui/react"
import { getBannerOrDefault } from "../../../utils/Utils";
import VerifiedNFTAvatar, { VERIFIED_AVATAR_TYPES } from "../../VerifiedNFTAvatar/VerifiedNFTAvatar";

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
                <VerifiedNFTAvatar data={data} type={VERIFIED_AVATAR_TYPES.PROFILE} />
            </Box>
            <Image
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