import React from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
    Flex,
    Text,
    Textarea,
    Image,
    Box
} from "@chakra-ui/react"
import { FaUser } from 'react-icons/fa'
import { ReactComponent as EditIcon } from "../../../assets/icons/edit-icon.svg";
import DEFAULT_PROFILE_PICTURE from '../../../assets/images/default_profile_pic.jpg';
import DEFAULT_BANNER from '../../../assets/images/default_banner.jpg';

class ProfileEditModal extends React.Component {
    constructor(props) {
        super(props)
    }

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

    render () {
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
                        <ModalHeader
                            px={{base: '24px', md: '64px'}}>
                            <ModalCloseButton
                                color={'primary.400'}
                                top={4}
                                left={4}
                                transform={'scale(1.8)'}
                                _focus={{outline: 0}}
                                _hover={{background: 'white'}}
                                _active={{background: 'white'}}
                            />
                            <Flex
                                justifyContent={'center'}
                                alignItems={'center'}
                                color={'primary.400'}
                            >
                                <Text
                                    fontWeight={700}
                                    fontSize="28px"
                                    mr="15px">
                                    Edit Profile
                                </Text>
                                <FaUser size={'2rem'}/>
                            </Flex>
                        </ModalHeader>

                        <ModalBody
                            px={{base: '24px', md: '64px'}}>
                            <form
                                id="setup-form"
                                onSubmit={this.handleProfileEditSubmit}
                            >
                                <Flex
                                    flexDirection={'column'}
                                    gap={'20px'}
                                    position={'relative'}>
                                    <Box
                                        position={'absolute'}
                                        top={'53%'}
                                        left={'50%'}
                                        marginLeft={'-60px'}>
                                        <Image
                                            border={'5px solid white'}
                                            src={this.props.loggedInUser.profilePic ? this.props.loggedInUser.profilePic : DEFAULT_PROFILE_PICTURE}
                                            fit={'cover'}
                                            overflow={'hidden'}
                                            borderRadius={'full'}
                                            boxSize={'120px'}/>
                                    </Box>
                                    <Image
                                        src={this.props.loggedInUser.bgImageURL ? this.props.loggedInUser.bgImageURL : DEFAULT_BANNER}
                                        fit={'cover'}
                                        overflow={'hidden'}
                                        borderRadius={'6px'}
                                        height={'200px'}/>
                                    <Button
                                        alignSelf={'end'}
                                        ml={'32px'}
                                        background={'primary.400'}
                                        color={'white'}
                                        px={'46px'}
                                        py={'11px'}
                                        borderRadius={'6px'}
                                        rightIcon={<EditIcon/>}
                                        _focus={{outline: 0}}>
                                        Edit
                                    </Button>
                                </Flex>
                                <FormControl
                                    isRequired
                                    pt={'12px'}>
                                    <FormLabel
                                        htmlFor='name'
                                        color={'primary.400'}
                                        fontWeight={700}
                                        fontSize={'20px'}
                                        mb={'3px'}>
                                        Name:
                                    </FormLabel>
                                    <Input
                                        id='name'
                                        defaultValue={this.props.loggedInUser.name}
                                        fontSize={'18px'}
                                        bg={'rgba(198, 219, 255, 0.32)'}
                                        border={'none'}/>
                                </FormControl>
                                <FormControl
                                    isRequired
                                    pt={'24px'}>
                                    <FormLabel
                                        htmlFor='username'
                                        color={'primary.400'}
                                        fontWeight={700}
                                        fontSize={'20px'}
                                        mb={'3px'}>
                                        Username:
                                    </FormLabel>
                                    <Input
                                        id='username'
                                        defaultValue={this.props.loggedInUser.username}
                                        fontSize={'18px'}
                                        bg={'rgba(198, 219, 255, 0.32)'}
                                        border={'none'}
                                        _placeholder={{fontWeight: '700', color: 'sub.400'}}/>
                                </FormControl>
                                <FormControl
                                    pt={'24px'}>
                                    <FormLabel
                                        htmlFor='bio'
                                        color={'primary.400'}
                                        fontWeight={700}
                                        fontSize={'20px'}
                                        mb={'3px'}>
                                        Bio:
                                    </FormLabel>
                                    <Textarea
                                        id='bio'
                                        defaultValue={this.props.loggedInUser.bio}
                                        fontSize={'18px'}
                                        bg={'rgba(198, 219, 255, 0.32)'}
                                        border={'none'}
                                        resize={'none'}
                                        size={'md'}
                                        minHeight={'140px'}
                                        _placeholder={{fontWeight: '700', color: 'sub.400'}}/>
                                </FormControl>
                            </form>
                        </ModalBody>
                        <ModalFooter
                            pt={'24px'}
                            px={{base: '24px', md: '64px'}}>
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
                                _focus={{outline: 0}}>
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
