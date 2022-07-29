import {
    Image,
    Box,
    keyframes
} from "@chakra-ui/react"
import { getAvatarOrDefault } from "../../utils/Utils";
import DefaultAvatar from '../../assets/images/default-avatar.png';

export const VERIFIED_AVATAR_TYPES = {
    PROFILE: "profile",
    POST: "post",
    NAVBAR: "navbar",
    SEARCH: "search",
    FOLLOW: "follow"
}

const VerifiedNFTAvatar = ({
    data,
    type
}) => {
    var boxSize;
    var shadowsBorderWidth;
    var nonNFTBorderWidth;

    switch (type) {
        case VERIFIED_AVATAR_TYPES.PROFILE:
            boxSize = '120px';
            shadowsBorderWidth = '3px';
            nonNFTBorderWidth = '5px';
            break;
        case VERIFIED_AVATAR_TYPES.POST:
            boxSize = '32px';
            shadowsBorderWidth = '1.5px';
            break;
        case VERIFIED_AVATAR_TYPES.NAVBAR:
            boxSize = '60px';
            shadowsBorderWidth = '2.5px';
            nonNFTBorderWidth = '3px';
            break;
        case VERIFIED_AVATAR_TYPES.SEARCH:
            boxSize = '115px';
            shadowsBorderWidth = '3px';
            nonNFTBorderWidth = '5px';
            break;
        case VERIFIED_AVATAR_TYPES.FOLLOW:
            boxSize = '48px';
            shadowsBorderWidth = '1.5px';
            break;
        default:
            boxSize = '32px'
            shadowsBorderWidth = '1px';
            nonNFTBorderWidth = "0px";
    }


    const rotateKeyFrame = keyframes`
        from {
            transform: rotate(0deg) scale(1);
        }
        to {
            transform: rotate(360deg) scale(1);
        }
    `

    const shadows = (borderWidth, weight) => {
        return `
        inset 0 ${borderWidth} 0 ${weight} rgb(225 131 194 / 25%),
        inset 0 -${borderWidth} 0 ${weight} rgb(165 181 222 / 25%), 
        inset ${borderWidth} 0 0 ${weight} rgb(225 131 194 / 25%), 
        inset -${borderWidth} 0 0 ${weight} rgb(165 181 222 / 25%), 
        inset ${borderWidth} -${borderWidth} 0 ${weight} rgb(195 156 208 / 50%), 
        inset -${borderWidth} ${borderWidth} 0 ${weight} rgb(195 156 208 / 50%), 
        inset ${borderWidth} ${borderWidth} 0 ${weight} rgb(255 105 180 / 75%), 
        inset -${borderWidth} -${borderWidth} 0 ${weight} rgb(135 206 235 / 75%)
        `
    }

    return (
        <Box position={'relative'}>
            <Box
                display={data.isProfilePicNFT ? "initial" : "none"}
                boxSize={boxSize}
                left={'0%'}
                position={"absolute"}
                borderRadius={'full'}
                boxShadow={shadows(shadowsBorderWidth, "0px")}
                animation={`${rotateKeyFrame} 1s linear infinite`}
            />
            <Image
                border={!data.isProfilePicNFT ? `${nonNFTBorderWidth} solid white` : 'none'}
                src={getAvatarOrDefault(data.profilePic)}
                fallbackSrc={DefaultAvatar}
                fit={'cover'}
                overflow={'hidden'}
                boxSize={boxSize}
                borderRadius={'full'} />
        </Box>
    )
}

export default VerifiedNFTAvatar;