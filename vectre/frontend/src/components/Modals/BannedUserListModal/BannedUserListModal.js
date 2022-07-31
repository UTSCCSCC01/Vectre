import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBannedUsers, unbanMember } from "../../../redux/actions/communities";
import { bannedUsersSelector } from "../../../redux/selectors/communities";
import { cutText, redirectWindow } from "../../../utils/Utils";
import ToggleHollowButton from "../../Buttons/ToggleHollowButton/ToggleHollowButton";
import EntityCard from "../../EntityCard/EntityCard";
import EntityListModal from "../EntityListModal/EntityListModal"
import { GENERIC_WARNING_TYPE } from '../GenericWarningModal/GenericWarningModal';
import Blank from "../../Blank/Blank";

const BannedUserListModal = ({
    isOpen,
    onClose
}) => {
    const dispatch = useDispatch();
    const { communityID } = useParams();
    const bannedUsers = useSelector(bannedUsersSelector);

    useEffect(() => {
        dispatch(getBannedUsers(communityID));
    }, []);

    const handleBanClick = (user) => {
        dispatch(unbanMember(communityID, user.walletAddress, redirectWindow))
    }

    return (
        <>
            <EntityListModal
                headerText={'Banned Users'}
                icon={GENERIC_WARNING_TYPE.BAN.icon}
                isOpen={isOpen}
                onClose={onClose}>
                {
                    bannedUsers && bannedUsers.length !== 0 ?
                        bannedUsers.map((user, i) =>
                            <div key={i}>
                                <EntityCard
                                    iconBoxSize={'40px'}
                                    bg={"none"}
                                    primaryText={cutText(user.name, 23)}
                                    secondaryText={"@" + cutText(user.username, 28)}
                                    href={"/user/" + user.walletAddress}
                                    data={user} >
                                    <ToggleHollowButton
                                        borderAccent={"rgba(255, 89, 89, 0.8)"}
                                        accent={'rgba(255, 89, 89, 1)'}
                                        onText={'Unban'}
                                        offText={'Ban'}
                                        isOn={user.alreadyBanned}
                                        onClick={() => handleBanClick(user)} />
                                </EntityCard>
                            </div>
                        ) : <Blank />
                }
            </EntityListModal>
        </>
    );
}

export default BannedUserListModal;