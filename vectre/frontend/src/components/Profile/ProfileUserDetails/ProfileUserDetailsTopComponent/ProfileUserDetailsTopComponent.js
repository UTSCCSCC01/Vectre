import {
    Image,
    Box,
    Flex,
    Text,
    Tooltip
} from "@chakra-ui/react"

import { getAvatarOrDefault, getBannerOrDefault, formatWalletAddress } from "../../../../utils/Utils";
import React, { useState } from "react";

const ProfileUserDetailsTopComponent = ({
    props
}) => {
    const [copied, setCopied] = useState(false);
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
                        src={getBannerOrDefault(props.user.banner)}
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
                    {
                        props.user.communityID ? <Text>{`< ${props.user.communityID} >`}</Text> : <Text>@{props.user.username}</Text>
                    }
                    <Box
                        display={props.user.walletAddress ? 'initial' : 'none'}
                        position={'absolute'}
                        bottom={'0px'}
                        right={'0px'}
                        mb={'12px'}
                        mr={'11px'}
                        cursor={'pointer'}
                        onClick={() => {
                            navigator.clipboard.writeText(props.user.walletAddress);
                            setCopied(true);
                        }}>
                        <Tooltip fontSize={'small'} placement={'top'} label={!copied ? "Click to copy wallet address" : "Copied!"} closeOnClick={false} aria-label='tooltip'>
                            <Text
                                onMouseLeave={() => { setTimeout(() => { setCopied(false) }, 300) }}
                                color={'rgba(105, 123, 152, 1)'}>
                                &#123; {formatWalletAddress(props.user.walletAddress)} &#125;
                            </Text>
                        </Tooltip>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}

export default ProfileUserDetailsTopComponent;