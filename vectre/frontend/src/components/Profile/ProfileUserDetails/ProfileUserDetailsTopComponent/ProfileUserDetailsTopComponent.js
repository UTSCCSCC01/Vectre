import {
    Image,
    Box,
    Flex,
    Text
} from "@chakra-ui/react"
import { getAvatarOrDefault, getBannerOrDefault, formatWalletAddress } from "../../../../utils/Utils";

const ProfileUserDetailsTopComponent = ({
    props
}) => {
    return (
        <>
            <Flex
                flexDirection={'column'}
                gap={'10px'}
                position={'relative'}>
                <Box
                    position={'absolute'}
                    top={'42%'}
                    left={'50%'}
                    marginLeft={'-60px'}
                    zIndex={'2'}>
                    <Image
                        border={'5px solid white'}
                        src={getAvatarOrDefault(props.user.profilePic)}
                        fit={'cover'}
                        overflow={'hidden'}
                        borderRadius={'full'}
                        boxSize={'120px'} />
                </Box>
                <Box
                    border={'12px solid white'}
                    bg={'white'}
                    borderRadius={'6px'}
                    height={'215px'}>
                    <Image
                        src={getBannerOrDefault(props.user.bgImageURL)}
                        fit={'cover'}
                        overflow={'hidden'}
                        borderRadius={'6px'}
                        width={'100%'}
                        height={'100%'} />
                </Box>
                <Flex
                    color={'primary.400'}
                    fontWeight={700}
                    flexDirection={'column'}
                    textAlign={'center'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    pt={'26px'}
                    pb={'12px'}
                    bg={'white'}
                    borderRadius={'6px'}
                    height={'90px'}
                    position={'relative'}
                    fontSize={'12px'}>
                    <Text fontSize={'24px'} lineHeight={'31.25px'}>{props.user.name}</Text>
                    <Text>@{props.user.username}</Text>
                    <Text
                        color={'rgba(105, 123, 152, 1)'}
                        position={'absolute'}
                        bottom={'0px'}
                        right={'0px'}
                        pb={'12px'}
                        pr={'11px'}>
                        &#123; {formatWalletAddress(props.user.walletAddress)} &#125;
                    </Text>
                </Flex>
            </Flex>
        </>
    )
}

export default ProfileUserDetailsTopComponent;