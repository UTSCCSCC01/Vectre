import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Text
} from "@chakra-ui/react";
import FollowUserCard from "./FollowUserCard/FollowUserCard"
import React from "react";

const ProfileFollowListModal = ({
    isOpen,
    onClose,
    followList
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
                    p={'5px'}>
                    <ModalBody>
                        {
                            followList.length > 0 ?
                                followList.map((user, i) => {
                                    return <FollowUserCard user={user} key={i} />
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