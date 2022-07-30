import {
    Button, 
    Image, 
} from '@chakra-ui/react';
import {cutText} from '../../../utils/Utils'; 

const CommunityButton = ({
    display,
    px,
    py,
    fontSize,
    fontWeight,
    color,
    bg,
    text,
    imgSrc, 
    ...otherProps
}) => {
    text = "<" + cutText(text, 10) + ">"; 
    return (
        <Button
            display={display ? display : 'inline-flex'}
            px={px ? px : '15px'}
            py={py ? py : '5.5px'}
            gap={'20px'}
            fontSize={fontSize ? fontSize : '12px'}
            fontWeight={fontWeight ? fontWeight : 500}
            color={color ? color : 'primary.400'}
            bg={bg ? bg : 'white'}
            _focus={{ outline: 0 }}
            lineHeight={'1'}
            {...otherProps} // other props can be passed into here
        >
            <Image src={imgSrc} align={'left'} height={'30px'} width={'auto'}/>
            {text}
        </Button>
    );
}

export default CommunityButton;