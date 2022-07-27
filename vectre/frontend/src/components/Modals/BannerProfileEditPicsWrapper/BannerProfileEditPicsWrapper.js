import {
    Flex,
    Spacer
} from "@chakra-ui/react"
import Banner from "./Banner/Banner"
import ProfilePic from "./ProfilePic/ProfilePic";

const BannerProfileEditPicsWrapper = ({
    data
}) => {
    return (
        <Flex
            flexDirection={'column'}
            gap={'20px'}
            position={'relative'}
            zIndex={5}>
            <ProfilePic data={data} />
            <Banner data={data} />
            <Spacer />
        </Flex>
    )
}

export default BannerProfileEditPicsWrapper;