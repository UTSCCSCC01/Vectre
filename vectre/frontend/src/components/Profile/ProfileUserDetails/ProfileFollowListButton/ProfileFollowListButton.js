import {
    useDisclosure
} from "@chakra-ui/react"
import ProfileFollowListModal from "../../../Modals/ProfileFollowListModal/ProfileFollowListModal";
import TextButton from "../../../Buttons/TextButton/TextButton";


const ProfileFollowListButton = ({
    followList,
    type
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <TextButton
                px={'17.5px'}
                fontSize={'18px'}
                fontWeight={700}
                color={'primary.400'}
                bg={'rgba(246, 250, 255, 1)'}
                text={followList.length + ' ' + type}
                onClick={onOpen} />
            <ProfileFollowListModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} followList={followList} type={type} />
        </>
    )
}

export default ProfileFollowListButton