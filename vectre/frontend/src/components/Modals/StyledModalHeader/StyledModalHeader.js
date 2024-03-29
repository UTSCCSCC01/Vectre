import {
    ModalHeader,
    ModalCloseButton,
    Flex,
    Text,
    Image
} from '@chakra-ui/react'

const StyledModalHeader = ({
    iconSRC,
    headerText,
    icon,
    hideClose,
    color = 'primary.400',
    fontSize = "28px",
    fontWeight = 700
}) => {
    return (
        <ModalHeader
            px={{ base: '24px', md: '64px' }}>
            <ModalCloseButton
                display={hideClose ? 'none' : 'initial'}
                color={'primary.400'}
                top={6}
                left={6}
                transform={'scale(1.8)'}
                _focus={{ outline: 0 }}
                _hover={{ background: 'white' }}
                _active={{ background: 'white' }}
            />
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                color={color}
            >
                <Text
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    mr="15px">
                    {headerText}
                </Text>
                {
                    iconSRC && (<Image src={iconSRC} boxSize={'1.5rem'} />)
                }
                {icon}
            </Flex>
        </ModalHeader>
    )
}

export default StyledModalHeader;