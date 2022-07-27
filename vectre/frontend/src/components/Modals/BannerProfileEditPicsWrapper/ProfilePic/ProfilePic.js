import {
    Box,
    Image,
    IconButton
} from "@chakra-ui/react"
import { BsFillPencilFill } from "react-icons/bs";
import { getAvatarOrDefault } from "../../../../utils/Utils";

const ProfilePic = ({
    data
}) => {
    return (
        <>
            <Box
                position={'absolute'}
                top={'53%'}
                left={'50%'}
                marginLeft={'-60px'}>
                <Image
                    border={'5px solid white'}
                    src={getAvatarOrDefault(data.profilePic)}
                    fit={'cover'}
                    overflow={'hidden'}
                    borderRadius={'full'}
                    boxSize={'120px'} />
                <IconButton
                    _focus={{ outline: 0 }}
                    bg={'rgba(35, 52, 71, 0.93)'}
                    color={'white'}
                    borderRadius={'40px'}
                    bottom={'3%'}
                    right={'-2%'}
                    position={'absolute'}
                    icon={<BsFillPencilFill size={'1.2rem'} />}
                />
            </Box>
        </>
    )
}

export default ProfilePic;