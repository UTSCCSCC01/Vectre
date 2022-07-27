import {
    Flex,
    Spacer
} from "@chakra-ui/react"
import Banner from "./Banner/Banner"
import ProfilePic from "./ProfilePic/ProfilePic";

const BannerProfileEditPicsWrapper = (props) => {
    return (
        <Flex
            flexDirection={'column'}
            gap={'20px'}
            position={'relative'}
            zIndex={5}>
            <ProfilePic {...props} />
            <Banner {...props} />
            <Spacer />
        </Flex>
    )
}

export default BannerProfileEditPicsWrapper;