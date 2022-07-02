import React from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    Link,
    Image,
    Flex,
    FormControl,
    Textarea
} from "@chakra-ui/react"

import DefaultAvatar from '../../../assets/images/default-avatar.png';
import TextButton from '../../Buttons/TextButton/TextButton'
import RepostComponent from "../../PostComponent/RepostComponent/RepostComponent";
import { useSelector } from "react-redux";
import { loggedInUserSelector } from "../../../redux/selectors/users";

const sampleLoggedInUserData = {
    walletAddress: "0x88a6be0f6b921edfcc5211dc716a397e141631a6",
    profilePic: "bruh",
    username: "PeetaC"
}

const RepostModal = ({
    item,
    isOpen,
    onClose
}) => {
    const loggedInUser = useSelector(loggedInUserSelector);
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                color={'primary.400'}
                size={'3xl'}>
                <ModalOverlay
                    bg={'rgba(250, 250, 250, 0.01)'}
                    backdropFilter='blur(20px)' />
                <ModalContent
                    bg={'rgba(255, 255, 255, 0.8)'}
                    py={'27px'}
                    px={'24px'}>
                    <ModalBody
                        py={'0px'}
                        px={'0px'}>
                        <form
                            id="repost-form"
                            onSubmit={(event) => {
                                event.preventDefault();
                                let repostPost = {
                                    text: event.target.text.value,
                                    repostPostID: item.postID,
                                    walletAddress: loggedInUser.walletAddress
                                }
                                console.log(repostPost)
                            }}
                        >
                            <Flex
                                gap={'15px'}
                                flexDirection={'column'}>
                                <Link
                                    href={"/user/" + loggedInUser.walletAddress}
                                    _hover={{ textDecoration: "none" }}
                                    _focus={{ outline: 0 }}
                                    maxWidth={'130px'}>
                                    <TextButton
                                        text={loggedInUser.username}
                                        px={'17.5px'}
                                        fontSize={'18px'}
                                        fontWeight={700}
                                        leftIcon={
                                            <Image
                                                src={loggedInUser.profilePic}
                                                fallbackSrc={DefaultAvatar}
                                                fit={'cover'}
                                                overflow={'hidden'}
                                                borderRadius={'full'}
                                                boxSize={'32px'} />
                                        } />
                                </Link>
                                <FormControl
                                    pb={'5px'}>
                                    <Textarea
                                        id='text'
                                        placeholder={"add a comment here!"}
                                        fontSize={'18px'}
                                        bg={'rgba(255, 255, 255, 0.7)'}
                                        border={'none'}
                                        resize={'none'}
                                        size={'md'}
                                        minHeight={'60px'}
                                        _placeholder={{ fontWeight: '700', color: 'sub.400' }} />
                                </FormControl>
                                <RepostComponent item={item} />
                            </Flex>
                        </form>
                    </ModalBody>
                    <ModalFooter
                        pt={'17px'}
                        pb={'0px'}
                        px={'0px'}>
                        <Button
                            type={"submit"}
                            form={"repost-form"}
                            alignSelf={'end'}
                            background={'primary.400'}
                            color={'white'}
                            px={'46px'}
                            py={'11px'}
                            borderRadius={'6px'}
                            _focus={{ outline: 0 }}>
                            Repost
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default RepostModal;
