import PostComponent from "../../components/PostComponent/PostComponent";

import {
    Box
} from '@chakra-ui/react'

const PostCommentsComponent = ({
    comments
}) => {
    return (
        <>
            {comments ? comments.map((item, i) => {
                return (
                        <Box id={item.postID} key={i} mt={item.parent ? "0 !important" : "initial"}>
                            <PostComponent item={item} />
                        </Box>
                    )
                })
                : <Box>No Comments? 🤔 </Box>
            }
        </>
    );
}

export default PostCommentsComponent;