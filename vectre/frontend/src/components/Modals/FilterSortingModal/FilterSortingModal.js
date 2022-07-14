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
    ButtonGroup, 

} from "@chakra-ui/react";

import {UPDATE_SORTING, UPLOAD_DATE_ASC, UPLOAD_DATE_DESC, NUMBER_OF_LIKES_ASC, NUMBER_OF_LIKES_DESC } from "../../../redux/constants/posts";
import { useDispatch } from "react-redux"; 
import { sortFeed } from "../../../redux/actions/posts";


const PostModalComponent = ({
    isOpen,
    onClose,
}) => {
    const dispatch = useDispatch()
    function dispatchCall(feedSorting){
        dispatch(sortFeed(feedSorting)); 
        onClose(); 
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
                                <h1>Sort By</h1>
                                <Button onClick={() => {dispatchCall(UPLOAD_DATE_ASC)}}>Latest to Oldest</Button>
                                <Button onClick={() => {dispatchCall(UPLOAD_DATE_DESC)}}>Oldest to Latest</Button>
                                <Button onClick={() => {dispatchCall(NUMBER_OF_LIKES_ASC)}}>Most Liked to Least Liked</Button>
                                <Button onClick={() => {dispatchCall(NUMBER_OF_LIKES_DESC)}}>Least Liked to Most Liked</Button>
                            </Stack>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default PostModalComponent;