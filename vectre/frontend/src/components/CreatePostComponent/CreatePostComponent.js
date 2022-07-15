import {
    Box,
    Flex,
    Stack,
    useDisclosure
} from "@chakra-ui/react"
import { BsFillCameraVideoFill, BsFillImageFill, BsLink45Deg } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import TextButton from "../Buttons/TextButton/TextButton";
import CreatePostModal from "../Modals/CreatePostModal/CreatePostModal";

const CreatePostComponent = ({
    communityID
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Stack
                spacing={'6px'}
                bg={'rgba(255, 255, 255, 0.4)'}
                borderRadius={'6px'}
                px={'12px'}
                py={'16px'}
                mt={'22px'}
                cursor={'pointer'}
                onClick={() => { onOpen() }}>
                <Flex
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    gap={'17px'}>
                    <Box
                        borderRadius={'6px'}
                        bg={'rgba(255, 255, 255, 0.7)'}
                        color={'brand.400'}
                        fontSize={'18px'}
                        fontWeight={700}
                        px={'13px'}
                        py={'11px'}
                        width={'100%'}
                        height={'60px'}>
                        {communityID ? `Love the ${communityID}? What's happening?` : "What's happening?"}
                    </Box>
                    <TextButton
                        bg={"primary.400"}
                        color={"white"}
                        fontSize={'18px'}
                        fontWeight={700}
                        text={"Post"}
                        onClick={() => { onOpen() }} />
                </Flex>
                <Flex
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Flex
                        alignItems={'center'}
                        flexDirection={'row'}
                        py={'4px'}
                        px={'10px'}
                        color={'primary.400'}
                        bg={'white'}
                        borderRadius={'6px'}
                        gap={'20px'}>
                        <ImAttachment size={"1.2rem"} />
                        <BsFillImageFill size={"1.3rem"} />
                        <BsFillCameraVideoFill size={"1.4rem"} />
                        <BsLink45Deg size={"1.4rem"} />
                    </Flex>
                    <TextButton
                        text={communityID ? `<${communityID}>` : `Select a <Community>`}
                        px={'17.5px'}
                        fontSize={'18px'}
                        fontWeight={700} />
                </Flex>
            </Stack>
            <CreatePostModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default CreatePostComponent;