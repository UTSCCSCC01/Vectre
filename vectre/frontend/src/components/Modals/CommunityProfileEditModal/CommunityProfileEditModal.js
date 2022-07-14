import React from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button
} from "@chakra-ui/react"
import { FaUserFriends } from 'react-icons/fa'
import { ReactComponent as EditIcon } from "../../../assets/icons/edit-icon.svg";
import FormInput from "../FormInput/FormInput";
import FormTextArea from "../FormTextArea/FormTextArea";
import StyledModalHeader from "../StyledModalHeader/StyledModalHeader";
import BannerProfilePicWrapper from "../BannerProfilePicWrapper/BannerProfilePicWrapper";

const CommunityProfileEditModal = ({
    communityData,
    isOpen,
    onClose
}) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                scrollBehavior="inside"
                color={'primary.400'}
                size={'3xl'}>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    backdropFilter='blur(20px)'
                />
                <ModalContent
                    py={'40px'}>
                    <StyledModalHeader headerText={'Edit Community'} icon={<FaUserFriends size={'2rem'} />} />
                    <ModalBody
                        px={{ base: '24px', md: '64px' }}>
                        <form
                            id="community-setup-form"
                            onSubmit={(event) => {
                                event.preventDefault();
                                let updatedCommunity = {
                                    name: event.target.name.value,
                                    communityID: event.target.communityID.value,
                                    bio: event.target.bio.value,
                                    discordLink: event.target.discordLink.value,
                                    instagramLink: event.target.instagramLink.value,
                                    twitterLink: event.target.twitterLink.value,
                                    websiteLink: event.target.websiteLink.value,
                                    ethLink: event.target.ethLink.value,
                                }
                                console.log(updatedCommunity)
                            }}
                        >
                            <BannerProfilePicWrapper
                                data={communityData}>
                                <Button
                                    alignSelf={'end'}
                                    ml={'32px'}
                                    background={'primary.400'}
                                    color={'white'}
                                    px={'46px'}
                                    py={'11px'}
                                    borderRadius={'6px'}
                                    rightIcon={<EditIcon />}
                                    _focus={{ outline: 0 }}
                                    disabled={true}> {/* TODO: Implement edit avatar/banner */}
                                    Edit
                                </Button>
                            </BannerProfilePicWrapper>
                            <FormInput inputID={'name'} inputLabelText={'Name:'} inputDefaultValue={communityData.name} isRequired={true} />
                            <FormInput inputID={'communityID'} inputLabelText={'Community ID:'} inputDefaultValue={communityData.communityID} isRequired={true} />
                            <FormInput inputID={'discordLink'} inputLabelText={'Discord Link:'} inputDefaultValue={communityData.discordLink} />
                            <FormInput inputID={'instagramLink'} inputLabelText={'Instagram Link:'} inputDefaultValue={communityData.instagramLink} />
                            <FormInput inputID={'twitterLink'} inputLabelText={'Twitter Link:'} inputDefaultValue={communityData.twitterLink} />
                            <FormInput inputID={'websiteLink'} inputLabelText={'Website Link:'} inputDefaultValue={communityData.websiteLink} />
                            <FormInput inputID={'ethLink'} inputLabelText={'Etherscan Link:'} inputDefaultValue={communityData.ethLink} />
                            <FormTextArea inputID={'bio'} inputLabelText={'Bio:'} inputDefaultValue={communityData.bio} />
                        </form>
                    </ModalBody>
                    <ModalFooter
                        pt={'24px'}
                        px={{ base: '24px', md: '74px' }}>
                        <Button
                            type={"submit"}
                            form={"community-setup-form"}
                            alignSelf={'end'}
                            ml={'32px'}
                            background={'primary.400'}
                            color={'white'}
                            px={'46px'}
                            py={'11px'}
                            borderRadius={'6px'}
                            _focus={{ outline: 0 }}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CommunityProfileEditModal;
