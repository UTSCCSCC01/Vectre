import {
    IconButton
} from '@chakra-ui/react';
import { RiQuestionFill } from 'react-icons/ri'

const IconSquareButton = ({
    display,
    px,
    py,
    color,
    bg,
    icon,
    ...otherProps
}) => {
    return (
        <IconButton
            display={display ? display : 'inline-flex'}
            px={px ? px : '8px'}
            py={py ? py : '3px'}
            color={color ? color : 'primary.400'}
            bg={bg ? bg : 'white'}
            borderRadius={'6px'}
            alignItems={'center'}
            icon={icon ? icon : <RiQuestionFill size="1.6rem" color='red' />} // Shows red RiQuestionFill icon if icon is not given
            _focus={{ outline: 0 }}
            {...otherProps} // other props can be passed into here
        >
        </IconButton>
    );
}

export default IconSquareButton;