import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Box,
    Flex,
    Icon
} from "@chakra-ui/react"
import StyledModalHeader from "../StyledModalHeader/StyledModalHeader";
import TextButton from "../../Buttons/TextButton/TextButton";
import { RiCloseCircleFill } from "react-icons/ri";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { IoBan } from "react-icons/io5";

export const GENERIC_WARNING_TYPE = {
    DELETE: {
        name: "Delete",
        title: "Delete Post",
        text: "Note that this cannot be undone, and the post will be removed from your profile, from the timeline of any accounts that follow you, and from all Vectre search results.",
        color: "rgba(255, 89, 89, 1)",
        icon: <Icon as={RiCloseCircleFill} color={'rgba(255, 89, 89, 1)'} />
    },
    BAN: {
        name: "Ban",
        title: "Ban User",
        text: "Banning a user will prevent them from posting or commenting in this community. Furthermore, their previous posts in this community will be permanently removed.",
        color: "rgba(255, 89, 89, 1)",
        icon: <Icon as={IoBan} color={'rgba(255, 89, 89, 1)'} />
    },
    PROMOTE: {
        name: "Promote",
        title: "Promote User",
        text: "Note that promoting a user to the moderator role comes with a large responsibility, ensure to promote users wisely.",
        color: "rgba(246, 133, 27, 0.86)",
        icon: <Icon as={BsFillArrowUpCircleFill} color={'primary.400'} />
    }
}

const GenericWarningModal = ({
    type,
    actionBtnOnClick,
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
                size={'sm'}>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    backdropFilter='blur(20px)'
                />
                <ModalContent
                    bg={'rgba(255, 255, 255, 0.9)'}
                    py={'10px'}>
                    <StyledModalHeader
                        fontSize={'20px'}
                        color={'brand.400'}
                        hideClose={true}
                        headerText={type.title}
                        icon={type.icon} />
                    <ModalBody
                        pt={0}
                        px={{ base: '24px', md: '40px' }}>
                        <Flex
                            flexDirection={'column'}
                            gap={'26px'}
                            mb={'32px'}>
                            <Box
                                borderRadius={'6px'}
                                bg={'rgba(198, 219, 255, 0.32)'}
                                color={'brand.400'}
                                fontWeight={400}
                                fontSize={'15px'}
                                lineHeight={'22px'}
                                px={'13px'}
                                py={'11px'}>
                                {type.text}
                            </Box>
                            <Flex
                                justifyContent={'space-between'}
                                height={'36px'}
                                width={'100%'}
                                gap={'20px'}>
                                <TextButton
                                    text={'Cancel'}
                                    bg={'primary.400'}
                                    color={'white'}
                                    py={'7.5px'}
                                    fontSize={'16px'}
                                    lineHeight={'20.83px'}
                                    fontWeight={700}
                                    width={"100%"}
                                    onClick={onClose}
                                />
                                <TextButton
                                    text={type.name}
                                    bg={type.color}
                                    color={'white'}
                                    py={'7.5px'}
                                    fontSize={'16px'}
                                    lineHeight={'20.83px'}
                                    fontWeight={700}
                                    width={"100%"}
                                    onClick={actionBtnOnClick}
                                />
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GenericWarningModal;