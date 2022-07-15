import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Flex, 
    Stack, 
    Button,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import {storeFeedSortType} from "../../../redux/actions/posts";
import {FEED_SORT_TYPE} from "../../../redux/constants/posts";

const PostModalComponent = ({
    isOpen,
    onClose
}) => {
    const dispatch = useDispatch()
    function updateFeedSortType(sortType){
        dispatch(storeFeedSortType(sortType))
        onClose()
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                color={'primary.400'}
                size={'2xl'}>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    backdropFilter='blur(20px)'
                />
                <ModalContent
                    py={'24px'}>
                    <ModalHeader
                        px={{ base: '24px', md: '32px' }}>
                        <ModalCloseButton
                            color={'primary.400'}
                            top={4}
                            left={4}
                            transform={'scale(1.8)'}
                            _focus={{ outline: 0 }}
                            _hover={{ background: 'white' }}
                            _active={{ background: 'white' }}
                        />
                    </ModalHeader>
                    <ModalBody
                        px={{ base: '24px', md: '32px' }} >
                        <Flex direction={"y"} gap="32px" justifyContent={"center"}>
                            <Stack>
                                <h1>Sort Feed By:</h1>
                                <Button onClick={() => {updateFeedSortType(FEED_SORT_TYPE.LIKES)}}>Most liked</Button>
                                <Button onClick={() => {updateFeedSortType(FEED_SORT_TYPE.TIMESTAMP)}}>Newest</Button>
                            </Stack>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default PostModalComponent;