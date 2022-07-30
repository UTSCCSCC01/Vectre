import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Flex
} from "@chakra-ui/react";
import StyledModalHeader from "../StyledModalHeader/StyledModalHeader"

const EntityListModal = ({
    headerText,
    icon,
    isOpen,
    onClose,
    ...otherProps
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
                        headerText={headerText}
                        fontSize={"20px"}
                        hideClose={true}
                        icon={icon} />
                    <ModalBody
                        py={'0px'}
                        px={'32px'}>
                        <Flex flexDirection={'column'} gap={'5px'}>
                            {otherProps.children}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EntityListModal;