import {
    Flex,
    Link,
    Spacer,
    Text
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { followUser, unfollowUser } from "../../../../redux/actions/users";
import { loggedInUserSelector } from "../../../../redux/selectors/users";
import TextButton from "../../../Buttons/TextButton/TextButton";
import VerifiedNFTAvatar, { VERIFIED_AVATAR_TYPES } from "../../../VerifiedNFTAvatar/VerifiedNFTAvatar";

const handleFollowClick = (walletAddress, profileWalletAddress, alreadyFollowed, setAlreadyFollowed, dispatch) => {
    if (!alreadyFollowed) {
        dispatch(followUser(walletAddress, profileWalletAddress, () => { setAlreadyFollowed(!alreadyFollowed) }));
    }
    else {
        dispatch(unfollowUser(walletAddress, profileWalletAddress, () => { setAlreadyFollowed(!alreadyFollowed) }));
    }
}

const FollowUserCard = ({
    user,
    type,
    onClose
}) => {
    const { walletAddress: profileWalletAddress } = useParams();
    const loggedInUser = useSelector(loggedInUserSelector);
    const [alreadyFollowed, setAlreadyFollowed] = useState(loggedInUser.following.some((liUser) => { return liUser.walletAddress === user.walletAddress }));
    const dispatch = useDispatch();
    return (
        <>
            <Flex
                mt={'5px'}
                mb={'10px'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'10px'}>
                <Link
                    href={"/user/" + user.walletAddress}
                    _hover={{ textDecoration: "none" }}
                    _focus={{ boxShadow: "none" }}>
                    <VerifiedNFTAvatar data={user} type={VERIFIED_AVATAR_TYPES.FOLLOW} />
                </Link>
                <Link
                    href={"/user/" + user.walletAddress}
                    _hover={{ textDecoration: "none" }}
                    _focus={{ boxShadow: "none" }}>
                    <Flex flexDirection={'column'}>
                        <Text
                            color={'primary.400'}
                            fontSize={'13px'}
                            fontWeight={400}>
                            <b>@{user.username}</b>
                        </Text>
                        <Text
                            color={'sub.400'}
                            fontSize={'13px'}
                            fontWeight={400}>
                            {user.name}
                        </Text>
                    </Flex>
                </Link>
                <Spacer />
                {
                    loggedInUser.walletAddress !== user.walletAddress ?
                        <TextButton
                            bg={alreadyFollowed ? "primary.400" : 'white'}
                            color={alreadyFollowed ? "white" : 'primary.400'}
                            px={'20px'}
                            fontSize={'15px'}
                            fontWeight={700}
                            text={alreadyFollowed ? "Following" : "Follow"}
                            onClick={() => {
                                handleFollowClick(user.walletAddress, profileWalletAddress, alreadyFollowed, setAlreadyFollowed, dispatch);
                            }} /> : <></>
                }
            </Flex>
        </>
    );
}

export default FollowUserCard;