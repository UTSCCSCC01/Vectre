import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getModerators } from "../../../redux/actions/communities";
import { moderatorsSelector } from "../../../redux/selectors/communities";
import { cutText } from "../../../utils/Utils";
import ToggleHollowButton from "../../Buttons/ToggleHollowButton/ToggleHollowButton";
import EntityCard from "../../EntityCard/EntityCard";
import EntityListModal from "../EntityListModal/EntityListModal"
import VerifiedIcon from '../../../assets/icons/verified-icon.svg';

const ModeratorListModal = ({
    isOpen,
    onClose
}) => {
    const dispatch = useDispatch();
    const { communityID } = useParams();
    const moderators = useSelector(moderatorsSelector);


    useEffect(() => {
        dispatch(getModerators(communityID));
    }, []);

    return (
        <>
            <EntityListModal
                headerText={'Moderators'}
                iconSRC={VerifiedIcon}
                isOpen={isOpen}
                onClose={onClose}>
                {moderators && moderators.map((user, i) =>
                    <EntityCard
                        key={i}
                        iconBoxSize={'40px'}
                        bg={"none"}
                        primaryText={cutText(user.name, 23)}
                        secondaryText={"@" + cutText(user.username, 28)}
                        href={"/user/" + user.walletAddress}
                        data={user} >
                        <ToggleHollowButton
                            borderAccent={"rgba(246, 133, 27, 0.71)"}
                            accent={'rgba(246, 133, 27, 0.71)'}
                            onText={'Moderator'}
                            offText={''}
                            isOn={true} />
                    </EntityCard>
                )}
            </EntityListModal>
        </>
    );
}

export default ModeratorListModal;