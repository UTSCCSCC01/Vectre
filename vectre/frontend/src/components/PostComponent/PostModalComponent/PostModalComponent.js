import {
    Modal,
    ModalOverlay,
    ModalContent,
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
                isCentered>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    backdropFilter='blur(20px)'
                />
                <ModalContent
                    p={'5px'}>
                    <Image
                        src={imageURL}
                        alt={imageURL}
                        overflow={'hidden'}
                        borderRadius={'6px'}
                        maxWidth={'100%'}
                        maxHeight={'100%'} />
                </ModalContent>
            </Modal>
        </>
    );
}

export default PostModalComponent;