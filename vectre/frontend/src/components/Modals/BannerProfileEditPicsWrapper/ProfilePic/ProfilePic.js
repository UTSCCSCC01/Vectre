import {
    Box,
    Image,
    IconButton,
    useDisclosure
} from "@chakra-ui/react"
import { BsFillPencilFill } from "react-icons/bs";
import { getAvatarOrDefault } from "../../../../utils/Utils";
import ProfilePicEditModal from "./ProfilePicEditModal/ProfilePicEditModal";

const ProfilePic = ({
    data,
    profilePicImageData,
    setProfilePicImageData,
    profilePicTokenID,
    setProfilePicTokenID,
    profilePicImageLink,
    setProfilePicImageLink
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box
                position={'absolute'}
                top={'53%'}
                left={'50%'}
                marginLeft={'-60px'}>
                <Image
                    border={'5px solid white'}
                    src={profilePicImageLink ? profilePicImageLink : (profilePicImageData ? URL.createObjectURL(profilePicImageData) : getAvatarOrDefault(data.profilePic))}
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
                    _hover={{ bg: "primary.400" }}
                    icon={<BsFillPencilFill size={'1.2rem'} />}
                    onClick={onOpen}
                />
            </Box>
            <ProfilePicEditModal
                data={data}
                isOpen={isOpen}
                onClose={onClose}
                profilePicImageData={profilePicImageData}
                setProfilePicImageData={setProfilePicImageData}
                profilePicTokenID={profilePicTokenID}
                setProfilePicTokenID={setProfilePicTokenID}
                profilePicImageLink={profilePicImageLink}
                setProfilePicImageLink={setProfilePicImageLink} />
        </>
    )
}

export default ProfilePic;