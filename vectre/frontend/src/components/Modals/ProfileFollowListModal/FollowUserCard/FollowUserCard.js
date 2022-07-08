import {
    Image,
    Flex,
    Link,
    Spacer,
    Text
} from "@chakra-ui/react";
import DefaultAvatar from "../../../../assets/images/default-avatar.png"
import TextButton from "../../../Buttons/TextButton/TextButton";

const FollowUserCard = ({
    user,
    onClose
}) => {
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
                    <Image
                        src={user.profilePic}
                        fallbackSrc={DefaultAvatar}
                        fit={'cover'}
                        overflow={'hidden'}
                        borderRadius={'full'}
                        boxSize={'48px'} />
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
                            @{user.username}
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
                <TextButton
                    bg={'primary.400'}
                    color={'white'}
                    px={'20px'}
                    fontSize={'15px'}
                    fontWeight={700}
                    text={"Follow"} />
            </Flex>
        </>
    );
}

export default FollowUserCard;