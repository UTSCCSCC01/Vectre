import {
    Button, Image
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
    lineHeight,
    imgSrc,
    imgSize = '25px',
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
            lineHeight={lineHeight ? lineHeight : '1'}
            {...otherProps} // other props can be passed into here
        >
            {
                imgSrc && (<Image
                    src={imgSrc}
                    fit={'cover'}
                    overflow={'hidden'}
                    borderRadius={'full'}
                    boxSize={imgSize} />)
            }
            {text}
        </Button>
    );
}

export default TextButton;