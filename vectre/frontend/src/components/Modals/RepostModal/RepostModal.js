import React, { useState } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    Link,
    Image,
    Flex,
    FormControl,
    Textarea,
    Select
} from "@chakra-ui/react"

import { BsFillCheckCircleFill } from 'react-icons/bs';
import DefaultAvatar from '../../../assets/images/default-avatar.png';
import TextButton from '../../Buttons/TextButton/TextButton'
import RepostComponent from "../../PostComponent/RepostComponent/RepostComponent";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUserSelector } from "../../../redux/selectors/users";
import { createRepost } from "../../../redux/actions/posts";
import { redirectWindow } from "../../../utils/Utils"

const RepostModal = ({
    item,
    isOpen,
    onClose
}) => {
    const loggedInUser = useSelector(loggedInUserSelector);
    const dispatch = useDispatch();
    const [option, setOption] = useState("");
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
                    bg={'rgba(250, 250, 250, 0.7)'}
                    py={'27px'}
                    px={'24px'}>
                    <ModalBody
                        py={'0px'}
                        px={'0px'}>
                        <form
                            id="repost-form"
                            onSubmit={(event) => {
                                event.preventDefault();
                                let repostData = {
                                    text: event.target.text.value,
                                    repostPostID: item.postID,
                                    walletAddress: loggedInUser.walletAddress,
                                    communityID: option
                                }
                                dispatch(createRepost(repostData, redirectWindow))
                                onClose();
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
                                    isRequired
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
                        <Select
                            placeholder={"Select a <Community>"}
                            fontSize={'18px'}
                            bg={'white'}
                            color={'primary.400'}
                            fontWeight={700}
                            variant={'filled'}
                            width={'fit-content'}
                            name={'option'}
                            onChange={(event) => { setOption(event.target.value) }}>
                            <option value={null}>{`Your profile (@${loggedInUser.username})`}</option>
                            {
                                loggedInUser.communities ? loggedInUser.communities.map((elem, i) => {
                                    return <option value={elem.communityID} key={i}>{`<${elem.communityID}>`}</option>
                                }) : null
                            }
                        </Select>
                        <TextButton
                            ml={'13px'}
                            form={"repost-form"}
                            type={"submit"}
                            px={'17.5px'}
                            text={'Repost'}
                            fontWeight={700}
                            fontSize={'18px'}
                            alignSelf={'end'}
                            background={'primary.400'}
                            color={'white'}>
                        </TextButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default RepostModal;
