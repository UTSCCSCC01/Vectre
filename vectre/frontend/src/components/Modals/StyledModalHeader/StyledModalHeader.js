import {
    ModalHeader,
    ModalCloseButton,
    Flex,
    Text
} from '@chakra-ui/react'

const StyledModalHeader = ({
    headerText,
    icon
}) => {
    return (
        <ModalHeader
            px={{ base: '24px', md: '64px' }}>
            <ModalCloseButton
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
                color={'primary.400'}
            >
                <Text
                    fontWeight={700}
                    fontSize="28px"
                    mr="15px">
                    {headerText}
                </Text>
                {icon}
            </Flex>
        </ModalHeader>
    )
}

export default StyledModalHeader;