import {
    Box,
    Flex
} from "@chakra-ui/react";
import IconSquareButton from "../Buttons/IconSquareButton/IconSquareButton";

const HeaderAndFilter = ({
    icon,
    onToggle,
    text
}) => {
    return (
        <Flex
            gap={'6px'}
            alignItems={'center'}
            height={'40px'}
            position={'relative'}>
            <Box
                bg={'rgba(255, 255, 255, 0.36)'}
                borderRadius={'10px'}
                height={'100%'}
                width={'100%'}
            />
            <IconSquareButton
                bg={'#D4D9E6'}
                borderRadius={'10px'}
                color={'#5A5A5A'}
                width={'40px'}
                icon={icon}
                zIndex={5}
                onClick={onToggle}
            />
            <Box
                position={'absolute'}
                textAlign={'center'}
                width={'100%'}
                fontWeight={700}
                fontSize={'17px'}
                color={'brand.400'}>
                {text}
            </Box>
        </Flex>
    )
}

export default HeaderAndFilter;