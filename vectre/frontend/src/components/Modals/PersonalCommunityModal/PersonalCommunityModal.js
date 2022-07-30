import {
    Modal,
    ModalOverlay,
    ModalContent
} from "@chakra-ui/react";
import { IoIosPeople } from 'react-icons/io';
import ToggleHollowButton from "../../Buttons/ToggleHollowButton/ToggleHollowButton";
import EntityCard from "../../EntityCard/EntityCard";
import StyledModalHeader from "../StyledModalHeader/StyledModalHeader"

const PersonalCommunityModal = ({
    isOpen,
    onClose,
    communitiesList,
}) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                position={'absolute'}
                py={'16px'}
                px={'13px'}
                padding={'20px'}
                isCentered>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    backdropFilter='blur(20px)'
                />
                <ModalContent
                    height={'500px'}
                    width={'500px'}
                    alignItems={'left'}>
                    <StyledModalHeader
                        headerText={'My Communities'}
                        headerFontSize={"18px"}
                        icon={<IoIosPeople />} />
                    {communitiesList.map((community, i) =>
                        <EntityCard
                            key={i}
                            primaryText={community.name}
                            secondaryText={"< " + community.communityID + " >"}
                            href={"/c/" + community.communityID}
                            data={community} >
                            <ToggleHollowButton
                                onText={'Joined'}
                                offText={'Join'}
                                isOn={community.alreadyJoined}
                                onClick={() => console.log("Peter was here")} />
                        </EntityCard>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default PersonalCommunityModal;