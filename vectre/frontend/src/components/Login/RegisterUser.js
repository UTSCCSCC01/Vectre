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
    useToast
} from "@chakra-ui/react"
import { FaUser } from 'react-icons/fa'

class RegisterUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            name: "",
            bio: "",
            isModalOpen: true
        }
    }

    handleOpenModal = () => { this.setState({ isModalOpen: true }) }
    handleCloseModal = () => { this.setState({ isModalOpen: false }) }

    handleRegisterSubmit = (event) => {
        event.preventDefault();
        let newUser = {
            name: event.target.name.value,
            username: event.target.username.value,
            bio: event.target.bio.value,
            walletAddress: this.props.walletAddress
        }
        this.props.createUser(newUser)
        this.handleCloseModal()
    }

    render() {
        return (
            <>
                <Modal
                    isOpen={this.state.isModalOpen}
                    onClose={this.handleCloseModal}
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
                            px={{ base: '24px', md: '64px' }}>
                            <ModalCloseButton
                                color={'primary.400'}
                                top={4}
                                left={4}
                                transform={'scale(1.8)'}
                                _focus={{ outline: 0 }}
                                _hover={{ background: 'white' }}
                                _active={{ background: 'white' }}
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
                                    Register User
                                </Text>
                                <FaUser size={'2rem'} />
                            </Flex>
                        </ModalHeader>

                        <ModalBody
                            px={{ base: '24px', md: '64px' }}>
                            <form
                                id="setup-form"
                                onSubmit={this.handleRegisterSubmit}
                            >
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
                                        placeholder='what is your name good ser?'
                                        fontSize={'18px'}
                                        bg={'rgba(198, 219, 255, 0.32)'}
                                        border={'none'}
                                        _placeholder={{ fontWeight: '700', color: 'sub.400' }} />
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
                                        placeholder='@username?'
                                        fontSize={'18px'}
                                        bg={'rgba(198, 219, 255, 0.32)'}
                                        border={'none'}
                                        _placeholder={{ fontWeight: '700', color: 'sub.400' }} />
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
                                        placeholder='i love me a good bio.&#13;&#10;love any projects?&#13;&#10;part of any communities?'
                                        fontSize={'18px'}
                                        bg={'rgba(198, 219, 255, 0.32)'}
                                        border={'none'}
                                        resize={'none'}
                                        size={'md'}
                                        minHeight={'140px'}
                                        _placeholder={{ fontWeight: '700', color: 'sub.400' }} />
                                </FormControl>
                            </form>
                        </ModalBody>
                        <ModalFooter
                            pt={'24px'}
                            px={{ base: '24px', md: '64px' }}>
                            <FormControl isReadOnly>
                                <FormLabel
                                    htmlFor='walletAddress'
                                    color={'primary.400'}
                                    fontWeight={700}
                                    fontSize={'20px'}
                                    mb={'3px'}>
                                    Wallet Address:
                                </FormLabel>
                                <Input
                                    id='walletAddress'
                                    placeholder={this.props.walletAddress}
                                    disabled={true}
                                    fontSize={'18px'}
                                    bg={'rgba(198, 219, 255, 0.32)'}
                                    border={'none'}
                                    _placeholder={{ fontWeight: '700', color: 'sub.400' }} />
                            </FormControl>
                            <Button
                                type={"submit"}
                                form={"setup-form"}
                                alignSelf={'end'}
                                ml={'32px'}
                                background={'primary.400'}
                                color={'white'}
                                px={'46px'}
                                py={'11px'}
                                borderRadius={'6px'}>
                                Save
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    }
}

export default RegisterUser;