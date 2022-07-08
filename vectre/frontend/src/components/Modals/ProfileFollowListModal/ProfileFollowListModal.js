import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalBody,
    Text,
    Flex
} from "@chakra-ui/react";
import FollowUserCard from "./FollowUserCard/FollowUserCard"
import { FaUser } from 'react-icons/fa'
import React from "react";

const ProfileFollowListModal = ({
    isOpen,
    onClose,
    followList,
    type
}) => {
    const [scrollBehavior, setScrollBehavior] = React.useState('inside');
    return (
        <>
            <Modal
                scrollBehavior={scrollBehavior}
                isOpen={isOpen}
                onClose={onClose}
                isCentered>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    backdropFilter='blur(20px)'
                />
                <ModalContent
                    height={"40vh"}
                    bg={'rgba(255, 255, 255, 0.7)'}
                    p={'5px'}>
                    <ModalHeader
                        pt={'10px'}
                        pb={'5px'}>
                        <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            color={'primary.400'}>
                            <Text
                                fontWeight={700}
                                fontSize="22px"
                                mr="15px">
                                {type}
                            </Text>
                            <FaUser size={'1.5rem'} />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        {
                            followList.length > 0 ?
                                followList.map((user, i) => {
                                    return <FollowUserCard user={user} key={i} type={type} />
                                })
                                : <Text>mhm 🤔</Text>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ProfileFollowListModal;