import { IoIosPeople } from 'react-icons/io';
import { useDispatch } from "react-redux";
import { joinCommunity, leaveCommunity } from "../../../redux/actions/communities";
import { joinLoginUserCommunity, leaveLoginUserCommunity } from "../../../redux/actions/users";
import { cutText } from "../../../utils/Utils";
import ToggleHollowButton from "../../Buttons/ToggleHollowButton/ToggleHollowButton";
import EntityCard from "../../EntityCard/EntityCard";
import { VERIFIED_AVATAR_TYPES } from '../../VerifiedNFTAvatar/VerifiedNFTAvatar';
import EntityListModal from "../EntityListModal/EntityListModal"

const PersonalCommunityModal = ({
    isOpen,
    onClose,
    communitiesList,
}) => {
    const dispatch = useDispatch();

    const handleJoin = (community) => {
        if (community.alreadyJoined) {
            dispatch(leaveCommunity(community.communityID, () => dispatch(leaveLoginUserCommunity(community.communityID))))
        }
        else {
            dispatch(joinCommunity(community.communityID, () => dispatch(joinLoginUserCommunity(community.communityID))))
        }
    }

    return (
        <>
            <EntityListModal
                headerText={'My Communities'}
                icon={<IoIosPeople />}
                isOpen={isOpen}
                onClose={onClose}>
                {communitiesList.map((community, i) =>
                    <EntityCard
                        iconType={VERIFIED_AVATAR_TYPES.POST}
                        key={i}
                        iconBoxSize={'40px'}
                        bg={"none"}
                        primaryText={cutText(community.name, 23)}
                        secondaryText={"< " + cutText(community.communityID, 28) + " >"}
                        href={"/c/" + community.communityID}
                        data={community} >
                        <ToggleHollowButton
                            onText={'Joined'}
                            offText={'Join'}
                            isOn={community.alreadyJoined}
                            onClick={() => handleJoin(community)} />
                    </EntityCard>
                )}
            </EntityListModal>
        </>
    );
}

export default PersonalCommunityModal;