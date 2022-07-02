import {
    Button
} from '@chakra-ui/react';

const TextButton = ({
    display,
    px,
    py,
    fontSize,
    fontWeight,
    color,
    bg,
    text,
    ...otherProps
}) => {
    return (
        <Button
            display={display ? display : 'inline-flex'}
            px={px ? px : '15px'}
            py={py ? py : '5.5px'}
            fontSize={fontSize ? fontSize : '12px'}
            fontWeight={fontWeight ? fontWeight : 500}
            color={color ? color : 'primary.400'}
            bg={bg ? bg : 'white'}
            _focus={{ outline: 0 }}
            lineHeight={'1'}
            {...otherProps} // other props can be passed into here
        >
            {text}
        </Button>
    );
}

export default TextButton;