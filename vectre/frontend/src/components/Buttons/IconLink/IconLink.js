import {
    IconButton
} from '@chakra-ui/react';
import { RiQuestionFill } from 'react-icons/ri'
import ButtonLinkWrapper from '../ButtonLinkWrapper/ButtonLinkWrapper';

const IconLink = ({
    href,
    display,
    px,
    py,
    color,
    icon,
    ...otherProps
}) => {
    return (
        <ButtonLinkWrapper display={display} href={href} isExternal={true}>
            <IconButton
                display={display ? display : 'inline-flex'}
                size={'sm'}
                px={px ? px : '0px'}
                py={py ? py : '0px'}
                color={color ? color : 'primary.400'}
                bg={'none'}
                alignItems={'center'}
                icon={icon ? icon : <RiQuestionFill size="1.6rem" color='red' />} // Shows red RiQuestionFill icon if icon is not given
                _hover={{ bg: 'none' }}
                _focus={{ outline: 0 }}
                {...otherProps} // other props can be passed into here
            />
        </ButtonLinkWrapper>
    );
}

export default IconLink;