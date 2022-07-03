import PostComponent from "../../components/PostComponent/PostComponent";

import {
    Box
} from '@chakra-ui/react'

const PostCommentsComponent = ({
    comments
}) => {
    return (
        <>
            {/* Add Comments below */}
            {
                comments !== undefined ?
                    comments.map((item, i) => {
                        return (
                            <Box key={i} mt={item.parent ? "0 !important" : "initial"}>
                                <PostComponent item={item} />
                            </Box>
                        )
                    })
                    : (
                        <Box>No Comments? 🤔 </Box>
                    )
            }
        </>
    );
}

export default PostCommentsComponent;