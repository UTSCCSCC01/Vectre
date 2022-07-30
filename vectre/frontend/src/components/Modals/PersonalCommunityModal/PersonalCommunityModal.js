import {
    Modal,
    ModalOverlay,
    ModalContent,
    Image, 
    Box
} from "@chakra-ui/react";

const PersonalCommunityModal = ({
    isOpen,
    onClose,
}) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                position={'absolute'}
                py={'16px'}
                px={'13px'}>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    // backdropFilter='blur(20px)'
                />
                <ModalContent
                    height={'500px'}
                    width={'500px'}>
                    <Box></Box>
                </ModalContent>
            </Modal>
        </>
    );
}

export default PersonalCommunityModal;