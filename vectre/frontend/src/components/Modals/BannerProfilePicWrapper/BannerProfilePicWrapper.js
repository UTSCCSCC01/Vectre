import {
    Flex,
    Box,
    Image,
    Spacer,
    IconButton
} from "@chakra-ui/react"
import { BsFillPencilFill } from "react-icons/bs";
import { getAvatarOrDefault, getBannerOrDefault } from "../../../utils/Utils";

const BannerProfileEditPicsWrapper = ({
    data
}) => {
    return (
        <Flex
            flexDirection={'column'}
            gap={'20px'}
            position={'relative'}
            zIndex={5}>
            <Box
                position={'absolute'}
                top={'53%'}
                left={'50%'}
                marginLeft={'-60px'}>
                <Image
                    border={'5px solid white'}
                    src={getAvatarOrDefault(data.profilePic)}
                    fit={'cover'}
                    overflow={'hidden'}
                    borderRadius={'full'}
                    boxSize={'120px'} />
                <IconButton
                    _focus={{ outline: 0 }}
                    bg={'rgba(35, 52, 71, 0.93)'}
                    color={'white'}
                    borderRadius={'40px'}
                    bottom={'3%'}
                    right={'-2%'}
                    position={'absolute'}
                    icon={<BsFillPencilFill size={'1.2rem'} />}
                />
            </Box>
            <Image
                src={getBannerOrDefault(data.banner)}
                fit={'cover'}
                overflow={'hidden'}
                borderRadius={'6px'}
                height={'200px'} />
            <IconButton
                _focus={{ outline: 0 }}
                bg={'rgba(35, 52, 71, 0.85)'}
                color={'white'}
                borderRadius={'40px'}
                width={'120px'}
                bottom={'10%'}
                right={'0%'}
                mr={'8px'}
                mb={'5px'}
                position={'absolute'}
                icon={<BsFillPencilFill size={'1.5rem'} />}
            />
            <Spacer />
        </Flex>
    )
}

export default BannerProfileEditPicsWrapper;