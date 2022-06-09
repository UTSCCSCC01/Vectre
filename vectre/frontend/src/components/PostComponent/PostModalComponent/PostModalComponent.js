import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Image
} from "@chakra-ui/react";

const PostModalComponent = ({
    isOpen,
    onClose,
    imageURL
}) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                color={'primary.400'}
                size={'4xl'}>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    backdropFilter='blur(20px)'
                />
                <ModalContent
                    p={'24px'}>
                    <ModalBody>
                        <Image
                            border={'2px solid var(--chakra-colors-brand-400)'}
                            src={imageURL}
                            fit={'cover'}
                            overflow={'hidden'}
                            borderRadius={'6px'} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default PostModalComponent;