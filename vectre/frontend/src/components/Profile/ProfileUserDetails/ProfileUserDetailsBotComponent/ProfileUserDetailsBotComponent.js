import {
    Flex,
    Box,
    Text,
    useDisclosure
} from "@chakra-ui/react"
import TextButton from "../../../Buttons/TextButton/TextButton";

import ProfileEditModal from "../../../Modals/ProfileEditModal/ProfileEditModal";
import ProfileFollowListButton from "../ProfileFollowListButton/ProfileFollowListButton";

const SampleIconLinks = [
    {
        type: "instagram",
        link: "https://www.instagram.com/peetacho/"
    },
    {
        type: "website",
        link: "https://peetacho.com/"
    },
    {
        type: "github",
        link: "https://github.com/peetacho"
    }
]

const ProfileUserDetailsBotComponent = ({
    props,
    handleUpdateUser,
    handleFollowUser,
    following
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Flex
                color={'primary.400'}
                fontWeight={700}
                flexDirection={'column'}
                py={'16px'}
                px={'12px'}
                bg={'white'}
                mt={'5px'}
                borderRadius={'6px'}
                fontSize={'12px'}>
                <Box
                    fontWeight={700}
                    fontSize={'18px'}
                    lineHeight={'23.44px'}
                    px={'14px'}
                    py={'10px'}
                    color={'rgba(25, 55, 102, 1)'}
                    bg={'rgba(198, 219, 255, 0.32)'}
                    borderRadius={'6px'}
                    whiteSpace={'pre-wrap'}>
                    {props.user.bio}
                </Box>
                <Flex
                    pt={'25px'}
                    justifyContent={'space-between'}
                    alignContent={'center'}>
                    <Flex
                        alignContent={'center'}
                        flexDirection={'row'}
                        px={'14px'}
                        py={'10px'}
                        color={'primary.400'}
                        bg={'rgba(248, 250, 255, 1)'}
                        borderRadius={'6px'}
                        gap={'10px'}>
                        {
                            SampleIconLinks.map((element, i) => {
                                return (
                                    <Text key={i}>{element.type}</Text>
                                )
                            })
                        }
                    </Flex>
                    <Flex
                        alignContent={'center'}
                        gap={'16px'}>
                        <ProfileFollowListButton followList={props.user.followers} type={'Followers'} />
                        <ProfileFollowListButton followList={props.user.following} type={'Following'} />
                        {/* Display edit profile is logged in user is same as profile being viewed */}
                        {
                            props.loggedInUser.walletAddress === props.profileWalletAddress ?
                                <>
                                    {/* Edit user profile */}
                                    <TextButton
                                        px={'17.5px'}
                                        fontSize={'18px'}
                                        fontWeight={700}
                                        color={'white'}
                                        bg={'primary.400'}
                                        text={'Edit'}
                                        onClick={onOpen} />
                                    <ProfileEditModal
                                        loggedInUser={props.loggedInUser}
                                        updateUser={handleUpdateUser}
                                        isOpen={isOpen}
                                        openModal={onOpen}
                                        closeModal={onClose}
                                    />
                                </> :
                                <>
                                    {/* Follow */}
                                    <TextButton
                                        px={'17.5px'}
                                        fontSize={'18px'}
                                        fontWeight={700}
                                        color={'white'}
                                        bg={'primary.400'}
                                        text={following ? "Unfollow" : "Follow"}
                                        onClick={handleFollowUser} />
                                </>
                        }
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default ProfileUserDetailsBotComponent;