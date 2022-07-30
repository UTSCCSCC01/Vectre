import {
    Button, 
    Image, 
} from '@chakra-ui/react';

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
    text = "<" + text + ">"; 
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
            <Image src={'../../assets/images/default_profile_pic.jpg'} align={'left'}/>
            {text}
        </Button>
    );
}

export default CommunityButton;