import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import ContentWithSideButtons from "../../components/Containers/ContentWithSideButtons";
import PostComponent from "../../components/PostComponent/PostComponent";
import {
    Box,
    Button,
    Stack
} from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import {
    feedIndexSelector,
    feedPaginationCompleteSelector,
    feedSelector,
    feedSortTypeSelector
} from "../../redux/selectors/feed";
import { useEffect } from "react";
import { getFeed } from "../../redux/actions/feed";
import CreatePostComponent from "../../components/CreatePostComponent/CreatePostComponent";
import SortingButtonComponent from "../../components/SortingButtonComponent/SortingButtonComponent";

const HomePage = () => {
    const sideButtonsList = [
    ]

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
                <CreatePostComponent />
                <SortingButtonComponent />
                <Stack mt={"20px"} alignSelf={'center'} gap={'36px'}>
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
            </ContentWithSideButtons>
        </ContentWIthNavContainer>
    )
}

export default HomePage;
