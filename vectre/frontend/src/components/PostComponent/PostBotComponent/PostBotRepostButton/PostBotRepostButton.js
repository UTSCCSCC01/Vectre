import {
    useDisclosure,
    Tooltip
} from '@chakra-ui/react';
import { AiOutlineRetweet } from 'react-icons/ai';
import IconSquareButton from '../../../Buttons/IconSquareButton/IconSquareButton';
import RepostModal from '../../../Modals/RepostModal/RepostModal';
// import { useDispatch } from 'react-redux';

const PostBotRepostButton = ({
    item
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const dispatch = useDispatch();
    return (
        <>
            <Tooltip label='Cannot repost a repost 🤯' placement='bottom' shouldWrapChildren>
                <IconSquareButton
                    isDisabled={item.repostPostID ? true : false}
                    display={item.parent ? 'none' : 'inline-flex'}
                    icon={<AiOutlineRetweet size="1.5rem" />}
                    onClick={(e) => {
                        onOpen();
                        e.stopPropagation();
                    }} />
            </Tooltip>
            <RepostModal item={item} isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default PostBotRepostButton;