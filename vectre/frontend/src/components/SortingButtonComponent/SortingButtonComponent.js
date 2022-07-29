import {
    Flex,
    Stack
} from "@chakra-ui/react";
import { AiFillClockCircle, AiFillFilter } from "react-icons/ai";
import { RiHeart2Fill } from "react-icons/ri";

import { useDispatch } from "react-redux";
import { storeFeedSortType } from "../../redux/actions/feed";
import { FEED_SORT_TYPE } from "../../redux/constants/feed";
import TextButton from "../Buttons/TextButton/TextButton";
import GenericButtonsPopoverWrapper from "../Containers/GenericButtonsPopoverWrapper";

const SortingButtonComponent = () => {
    const dispatch = useDispatch()
    function updateFeedSortType(sortType) {
        dispatch(storeFeedSortType(sortType))
    }

    const SortingButton = ({ onToggle }) => {
        return (
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
                        rightIcon={<AiFillFilter size={'1.2rem'} />}
                        onClick={() => {
                            onToggle()
                        }}
                    />
                </Flex>
            </Stack>
        )
    }

    return (
        <>
            <GenericButtonsPopoverWrapper
                placement="bottom-end"
                buttons={
                    <>
                        <TextButton
                            height={'fit-content'}
                            py={'5px'}
                            width={'100%'}
                            color={'primary.400'}
                            bg={'rgba(228, 239, 255, 0.62)'}
                            text={"Most liked"}
                            onClick={() => { updateFeedSortType(FEED_SORT_TYPE.LIKES) }}
                            rightIcon={<RiHeart2Fill size={'1.2rem'} />} />
                        <TextButton
                            height={'fit-content'}
                            py={'5px'}
                            width={'100%'}
                            color={'primary.400'}
                            bg={'rgba(228, 239, 255, 0.62)'}
                            text={"Newest"}
                            onClick={() => { updateFeedSortType(FEED_SORT_TYPE.TIMESTAMP) }}
                            rightIcon={<AiFillClockCircle size={'1.2rem'} />} />
                    </>
                }>
                <SortingButton />
            </GenericButtonsPopoverWrapper>
        </>
    );
}

export default SortingButtonComponent;