import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import ContentWithSideButtons from "../../components/Containers/ContentWithSideButtons";
import PostComponent from "../../components/PostComponent/PostComponent";
import FilterSortingModal from "../../components/Modals/FilterSortingModal/FilterSortingModal"
import {
    Box,
    Button,
    Stack,
    useDisclosure
} from '@chakra-ui/react'
import {useDispatch, useSelector} from "react-redux";
import {
    feedIndexSelector,
    feedPaginationCompleteSelector,
    feedSelector,
    feedSortTypeSelector
} from "../../redux/selectors/posts";
import {useEffect} from "react";
import {getFeed} from "../../redux/actions/posts";

const HomePage = () => {
    const sideButtonsList = [
      {
        link: "",
        text: "Sort Feed",
        func: () => {
          onOpen();
        }
      }
    ]

    const {isOpen, onOpen, onClose} = useDisclosure();

    const feed = useSelector(feedSelector)
    const feedIndex = useSelector(feedIndexSelector)
    const feedPaginationComplete = useSelector(feedPaginationCompleteSelector)
    const feedSortType = useSelector(feedSortTypeSelector)
    const dispatch = useDispatch()

    function loadFeed() {
        dispatch(getFeed(feedIndex, feedSortType))
    }
    useEffect(() => {
        loadFeed()
    }, [feedSortType])

    return (
        <ContentWIthNavContainer>
            <ContentWithSideButtons sideButtonsList={sideButtonsList}>
                <Box py={'60px'} maxWidth={'4xl'} margin={'0 auto'}>
                    <Stack alignSelf={'center'} gap={'36px'}>
                        {feed.map((item, i) => {
                            return (
                                <Box key={i}>
                                    <PostComponent item={item} fromFeed={true} />
                                </Box>
                            )
                        })}
                        {feed.length === feedIndex && !feedPaginationComplete ?
                            <Button onClick={loadFeed}>Load more</Button>
                            : null}
                    </Stack>
                </Box>
                <FilterSortingModal isOpen={isOpen} onClose={onClose} />
            </ContentWithSideButtons>
        </ContentWIthNavContainer>
    )
}

export default HomePage;
