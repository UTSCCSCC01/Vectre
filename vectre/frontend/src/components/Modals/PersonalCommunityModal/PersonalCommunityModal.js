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
                isCentered>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    backdropFilter='blur(20px)'
                    />
                <ModalContent
                    height={'500px'}
                    width={'600px'}
                    alignItems={'left'}
                    padding={'30px'}
                    bg={'rgba(255, 255, 255, 0.92)'}
                    gap={'10px'}
                    >
                    <StyledModalHeader
                        headerText={'My Communities'}
                        headerFontSize={"20px"}
                        icon={<IoIosPeople />} 
                        overFlowY={'scroll'}/>
                    {communitiesList.map((community, i) =>
                        <EntityCard
                            key={i}
                            primaryText={community.name}
                            secondaryText={"< " + community.communityID + " >"}
                            href={"/c/" + community.communityID}
                            data={community} 
                            height = {'10px'}
                            >
                            <ToggleHollowButton
                                onText={'Joined'}
                                offText={'Join'}
                                isOn={community.alreadyJoined}
                                bg={'#3B82F68F'}
                                color={'white'}
                                border={'none'}
                                onClick={() => console.log("Peter was here")} />
                        </EntityCard>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default PersonalCommunityModal;