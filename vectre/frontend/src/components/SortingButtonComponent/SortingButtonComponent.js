import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Flex,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import { AiFillClockCircle } from "react-icons/ai";
import { FaSort } from "react-icons/fa";
import { RiHeart2Fill } from "react-icons/ri";

import { useDispatch } from "react-redux";
import { storeFeedSortType } from "../../redux/actions/feed";
import { FEED_SORT_TYPE } from "../../redux/constants/feed";
import TextButton from "../Buttons/TextButton/TextButton";

const SortingButtonComponent = () => {
    const { isOpen, onToggle, onClose } = useDisclosure()
    const dispatch = useDispatch()
    function updateFeedSortType(sortType) {
        dispatch(storeFeedSortType(sortType))
    }

    return (
        <>

            <Popover
                placement="bottom-end"
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={onClose}>
                <PopoverTrigger>
                    <Stack
                        mt={'10px'}>
                        <Flex
                            flexDirection={'column'}>
                            <TextButton
                                justifySelf={'end'}
                                alignSelf={'end'}
                                color={'primary.400'}
                                bg={'rgba(255, 255, 255, 0.5)'}
                                text={'Sort By'}
                                py={'5px'}
                                px={'15px'}
                                height={'fit-content'}
                                width={'130px'}
                                rightIcon={<FaSort size={'1.3rem'} />}
                                onClick={() => {
                                    onToggle()
                                }}
                            />
                        </Flex>
                    </Stack>
                </PopoverTrigger>
                <PopoverContent
                    width={'180px'}
                    py={'16px'}
                    px={'13px'}>
                    <Stack
                        gap="5px" justifyContent={"center"}>
                        <TextButton
                            height={'fit-content'}
                            py={'5px'}
                            width={'100%'}
                            color={'primary.400'}
                            bg={'rgba(228, 239, 255, 0.62)'}
                            onClick={() => { updateFeedSortType(FEED_SORT_TYPE.LIKES) }}
                            text={"Most Likes"}
                            rightIcon={<RiHeart2Fill size={'1.2rem'} />} />
                        <TextButton
                            height={'fit-content'}
                            py={'5px'}
                            width={'100%'}
                            color={'primary.400'}
                            bg={'rgba(228, 239, 255, 0.62)'}
                            onClick={() => { updateFeedSortType(FEED_SORT_TYPE.TIMESTAMP) }}
                            rightIcon={<AiFillClockCircle size={'1.2rem'} />}
                            text={"Newest"} />
                    </Stack>
                </PopoverContent>
            </Popover>
        </>
    );
}

export default SortingButtonComponent;