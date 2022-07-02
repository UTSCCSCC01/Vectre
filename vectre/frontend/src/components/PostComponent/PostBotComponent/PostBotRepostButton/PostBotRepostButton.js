import {
    useDisclosure
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
            <IconSquareButton
                display={item.parent ? 'none' : 'inline-flex'}
                icon={<AiOutlineRetweet size="1.5rem" />}
                onClick={(e) => {
                    onOpen();
                    e.stopPropagation();
                }} />
            <RepostModal item={item} isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default PostBotRepostButton;