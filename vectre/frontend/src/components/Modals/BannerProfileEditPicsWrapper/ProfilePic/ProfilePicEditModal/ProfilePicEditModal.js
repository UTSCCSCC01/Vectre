import React, { useState } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    Flex,
    Image
} from "@chakra-ui/react"
import { FaUserCircle } from 'react-icons/fa'
import { SiEthereum } from 'react-icons/si'
import { RiImageAddFill } from 'react-icons/ri'
import StyledModalHeader from "../../../StyledModalHeader/StyledModalHeader";
import { getAvatarOrDefault, getBase64Async } from "../../../../../utils/Utils";
import TextButton from "../../../../Buttons/TextButton/TextButton";

const ProfilePicEditModal = ({
    data,
    isOpen,
    onClose
}) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                color={'primary.400'}
                size={'3xl'}>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    backdropFilter='blur(20px)'
                />
                <ModalContent
                    bg={'rgba(255, 255, 255, 0.9)'}
                    py={'10px'}>
                    <StyledModalHeader headerText={'Choose Profile Picture'} icon={<FaUserCircle size={'2rem'} />} />
                    <ModalBody
                        px={{ base: '24px', md: '64px' }}>
                        <Flex
                            flexDirection={'column'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            gap={'20px'}>
                            <Image
                                border={'5px solid white'}
                                src={getAvatarOrDefault(data.profilePic)}
                                fit={'cover'}
                                overflow={'hidden'}
                                borderRadius={'full'}
                                boxSize={'180px'} />
                            <TextButton
                                text={'Select NFT'}
                                fontWeight={700}
                                fontSize={'18px'}
                                background={'primary.400'}
                                color={'white'}
                                px={'46px'}
                                py={'11px'}
                                rightIcon={<SiEthereum />}
                            />
                            <TextButton
                                text={'Upload Image'}
                                fontWeight={700}
                                fontSize={'18px'}
                                background={'primary.400'}
                                color={'white'}
                                px={'46px'}
                                py={'11px'}
                                rightIcon={<RiImageAddFill />}
                            />
                        </Flex>
                    </ModalBody>
                    <ModalFooter
                        pt={'24px'}
                        px={{ base: '24px', md: '64px' }}>
                        <Button
                            alignSelf={'end'}
                            ml={'32px'}
                            background={'primary.400'}
                            color={'white'}
                            px={'46px'}
                            py={'11px'}
                            borderRadius={'6px'}
                            _focus={{ outline: 0 }}
                            onClick={onClose}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ProfilePicEditModal;
