import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Flex
} from "@chakra-ui/react";
import { IoIosPeople } from 'react-icons/io';
import { cutText } from "../../../utils/Utils";
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
                size={"lg"}
                scrollBehavior={'inside'}
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
                    height={'40vh'}
                    py={'15px'}
                    bg={'rgba(255, 255, 255, 0.92)'}
                >
                    <StyledModalHeader
                        headerText={'My Communities'}
                        fontSize={"20px"}
                        hideClose={true}
                        icon={<IoIosPeople />} />
                    <ModalBody
                        py={'0px'}
                        px={'32px'}>
                        <Flex flexDirection={'column'} gap={'5px'}>
                            {communitiesList.map((community, i) =>
                                <>
                                    <EntityCard
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
                                            onClick={() => console.log("Peter was here")} />
                                    </EntityCard>
                                </>
                            )}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default PersonalCommunityModal;