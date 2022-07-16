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
import { useDispatch } from "react-redux";
import { createCommunity, updateCommunity } from "../../../redux/actions/communities";
import { redirectWindow } from "../../../utils/Utils";

const CommunityProfileEditModal = ({
    communityData,
    isOpen,
    onClose,
    isEdit
}) => {
    const dispatch = useDispatch();
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
                    <StyledModalHeader headerText={isEdit ? 'Edit Community' : 'Create a Community'} icon={<FaUserFriends size={'2rem'} />} />
                    <ModalBody
                        px={{ base: '24px', md: '64px' }}>
                        <form
                            id="community-edit-form"
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
                                if (isEdit) {
                                    dispatch(updateCommunity(communityData.communityID, updatedCommunity, redirectWindow))
                                    onClose();
                                }
                                else {
                                    dispatch(createCommunity(updatedCommunity, redirectWindow))
                                }
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
                                    {isEdit ? "Edit" : "Choose"}
                                </Button>
                            </BannerProfilePicWrapper>
                            {
                                isEdit ? (
                                    <>
                                        <FormInput inputID={'name'} inputLabelText={'Community Name:'} inputDefaultValue={communityData.name} isRequired={true} />
                                        <FormInput inputID={'communityID'} inputLabelText={'Community ID:'} inputDefaultValue={communityData.communityID} isRequired={true} />
                                        <FormTextArea inputID={'bio'} inputLabelText={'Bio:'} inputDefaultValue={communityData.bio} />
                                        <FormInput inputID={'websiteLink'} inputLabelText={'Website Link:'} inputDefaultValue={communityData.websiteLink} />
                                        <FormInput inputID={'ethLink'} inputLabelText={'Smart Contract Link:'} inputDefaultValue={communityData.ethLink} />
                                        <FormInput inputID={'discordLink'} inputLabelText={'Discord Link:'} inputDefaultValue={communityData.discordLink} />
                                        <FormInput inputID={'twitterLink'} inputLabelText={'Twitter Link:'} inputDefaultValue={communityData.twitterLink} />
                                        <FormInput inputID={'instagramLink'} inputLabelText={'Instagram Link:'} inputDefaultValue={communityData.instagramLink} />
                                    </>
                                ) : (
                                    <>
                                        <FormInput inputID={'name'} inputLabelText={'Community Name:'} inputPlaceholderValue={"Add a Community Name"} isRequired={true} />
                                        <FormInput inputID={'communityID'} inputLabelText={'Community ID:'} inputPlaceholderValue={"Add a Community ID, a username for your community!"} isRequired={true} />
                                        <FormTextArea inputID={'bio'} inputLabelText={'Bio:'} inputPlaceholderValue={"Add a bio, and tell us more about the community you are creating."} />
                                        <FormInput inputID={'websiteLink'} inputLabelText={'Website Link:'} inputPlaceholderValue={"Link to the community website?"} />
                                        <FormInput inputID={'ethLink'} inputLabelText={'Smart Contract Link:'} inputPlaceholderValue={"Link to the smart contract?"} />
                                        <FormInput inputID={'discordLink'} inputLabelText={'Discord Link:'} inputPlaceholderValue={"Link to the discord community?"} />
                                        <FormInput inputID={'twitterLink'} inputLabelText={'Twitter Link:'} inputPlaceholderValue={"Link to the twitter account?"} />
                                        <FormInput inputID={'instagramLink'} inputLabelText={'Instagram Link:'} inputPlaceholderValue={"Link to the instagram account?"} />
                                    </>
                                )
                            }
                        </form>
                    </ModalBody>
                    <ModalFooter
                        pt={'24px'}
                        px={{ base: '24px', md: '74px' }}>
                        <Button
                            type={"submit"}
                            form={"community-edit-form"}
                            alignSelf={'end'}
                            ml={'32px'}
                            background={'primary.400'}
                            color={'white'}
                            px={'46px'}
                            py={'11px'}
                            borderRadius={'6px'}
                            _focus={{ outline: 0 }}>
                            {isEdit ? "Save" : "Create"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CommunityProfileEditModal;
