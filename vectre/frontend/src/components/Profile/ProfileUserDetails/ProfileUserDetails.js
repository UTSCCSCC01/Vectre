import ProfileUserDetailsTopComponent from './ProfileUserDetailsTopComponent/ProfileUserDetailsTopComponent';
import ProfileUserDetailsBotComponent from './ProfileUserDetailsBotComponent/ProfileUserDetailsBotComponent';

import Dashboard from "../../Dashboard/Dashboard"
import ProfilePosts from "../ProfilePosts/ProfilePosts";
import ContentWithSideButtons from "../../Containers/ContentWithSideButtons";
import { useDisclosure } from '@chakra-ui/react';
import CommunityProfileEditModal from '../../Modals/CommunityProfileEditModal/CommunityProfileEditModal';

const profileSideButtonsList = (createCommunityOnOpen) => [
    {
        text: "Create a Community",
        func: () => { createCommunityOnOpen() }
    }
]

const ProfileUserDetails = ({
    props,
    handleUpdateUser,
    handleFollowUser,
    following
}) => {
    const { isOpen: createCommunityIsOpen, onOpen: createCommunityOnOpen, onClose: createCommunityOnClose } = useDisclosure()
    return (
        <>
            <ContentWithSideButtons sideButtonsList={props.loggedInUser.walletAddress === props.profileWalletAddress ? profileSideButtonsList(
                createCommunityOnOpen
            ) : []}>
                <ProfileUserDetailsTopComponent props={props} />
                <ProfileUserDetailsBotComponent props={props} handleUpdateUser={handleUpdateUser} handleFollowUser={handleFollowUser} following={following} />
                {(props.loggedInUser.walletAddress === props.profileWalletAddress || props.user.dashboard !== "[]") ? // Only show empty dashboard if its your own
                    <Dashboard
                        loggedInUser={props.loggedInUser}
                        profileWalletAddress={props.profileWalletAddress}
                        currentDashboard={props.user.dashboard}
                    /> : null
                }
                <ProfilePosts props={props} />
            </ContentWithSideButtons>
            <CommunityProfileEditModal communityData={{}} isOpen={createCommunityIsOpen} onClose={createCommunityOnClose} isEdit={false} />
        </>
    )
}

export default ProfileUserDetails;