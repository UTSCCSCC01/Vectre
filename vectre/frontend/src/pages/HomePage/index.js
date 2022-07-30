import ContentWIthNavContainer from "../../components/Containers/ContentWIthNavContainer";
import ContentWithCommunityButtons from "../../components/Containers/ContentWithCommunityButtons";
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
// import {default_profile} from "../../assets/images/default_profile_pic.jpg"; 

const HomePage = () => {
    const sideButtonsList = [
        {
            hidden: false, 
            link: "#", 
            function: () => {

            }, 
            text: "community 1", 
            imgSrc: "http://img.mp.sohu.com/upload/20170529/23d0bcbcfa46413ba1342c179cbf41d1_th.png"
        }, 
        {
            hidden: false, 
            link: "#", 
            function: () => {

            }, 
            text: "community 2", 
            imgSrc: "http://img.mp.sohu.com/upload/20170529/23d0bcbcfa46413ba1342c179cbf41d1_th.png"
        }, 
        {
            hidden: false, 
            link: "#", 
            function: () => {

            }, 
            text: "community 3", 
            imgSrc: "http://img.mp.sohu.com/upload/20170529/23d0bcbcfa46413ba1342c179cbf41d1_th.png"
        }, 
        {
            hidden: false, 
            link: "#", 
            function: () => {

            }, 
            text: "community 4", 
            imgSrc: "http://img.mp.sohu.com/upload/20170529/23d0bcbcfa46413ba1342c179cbf41d1_th.png"
        }, 
        {
            hidden: false, 
            link: "#", 
            function: () => {

            }, 
            text: "community 5", 
            imgSrc: "http://img.mp.sohu.com/upload/20170529/23d0bcbcfa46413ba1342c179cbf41d1_th.png"
        }, 

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
            <ContentWithCommunityButtons sideButtonsList={sideButtonsList}>
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
            </ContentWithCommunityButtons>
        </ContentWIthNavContainer>
    )
}

export default HomePage;
