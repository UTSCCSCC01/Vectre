import React from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button
} from "@chakra-ui/react"
import { FaUser } from 'react-icons/fa'
import { ReactComponent as EditIcon } from "../../../assets/icons/edit-icon.svg";
import FormInput from "../FormInput/FormInput";
import FormTextArea from "../FormTextArea/FormTextArea";
import StyledModalHeader from "../StyledModalHeader/StyledModalHeader";
import BannerProfilePicWrapper from "../BannerProfilePicWrapper/BannerProfilePicWrapper";
class ProfileEditModal extends React.Component {

    handleProfileEditSubmit = (event) => {
        event.preventDefault();
        let updatedUser = {
            name: event.target.name.value,
            username: event.target.username.value,
            bio: event.target.bio.value
        }
        this.props.updateUser(updatedUser)
        this.props.closeModal()
    }

    render() {
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    onClose={this.props.closeModal}
                    isCentered
                    color={'primary.400'}
                    size={'3xl'}>
                    <ModalOverlay
                        bg={'rgba(255, 255, 255, 0.01)'}
                        backdropFilter='blur(20px)'
                    />
                    <ModalContent
                        py={'40px'}>
                        <StyledModalHeader headerText={'Edit Profile'} icon={<FaUser size={'2rem'} />} />
                        <ModalBody
                            px={{ base: '24px', md: '64px' }}>
                            <form
                                id="setup-form"
                                onSubmit={this.handleProfileEditSubmit}
                            >
                                <BannerProfilePicWrapper
                                    data={this.props.loggedInUser}>
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
                                <FormInput inputID={'name'} inputDefaultValue={this.props.loggedInUser.name} inputLabelText={'Name:'} isRequired={true} />
                                <FormInput inputID={'username'} inputDefaultValue={this.props.loggedInUser.username} inputLabelText={'Username:'} isRequired={true} />
                                <FormTextArea inputID={'bio'} inputDefaultValue={this.props.loggedInUser.bio} inputLabelText={'Bio:'} />
                            </form>
                        </ModalBody>
                        <ModalFooter
                            pt={'24px'}
                            px={{ base: '24px', md: '64px' }}>
                            <Button
                                type={"submit"}
                                form={"setup-form"}
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
}

export default ProfileEditModal;
