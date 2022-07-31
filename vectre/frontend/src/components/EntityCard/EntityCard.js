import {
    Flex,
    Link,
    Text
} from "@chakra-ui/react"
import VerifiedNFTAvatar from "../VerifiedNFTAvatar/VerifiedNFTAvatar";

const EntityCard = ({
    iconType,
    key,
    iconBoxSize = "68px",
    bg = "white",
    data,
    href,
    primaryText,
    secondaryText,
    tertiaryText,
    ...otherProps
}) => {
    return (
        <Link key={key} _hover={{ textDecoration: "none" }} href={href}>
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                borderRadius={"6px"}
                bg={bg}
                flexDirection={'row'}
                px={'12px'}
                py={'12px'}>
                <Flex
                    flexDirection={'row'}
                    alignItems={"center"}
                    gap={'15px'}>
                    <VerifiedNFTAvatar type={iconType} data={data} />
                    <Flex
                        flexDirection={'column'}
                        gap={'1px'}>
                        <Text fontSize={"18px"} fontWeight={500} color={"primary.400"} lineHeight={'23.44px'}>
                            {primaryText}
                        </Text>
                        <Text fontSize={"13px"} fontWeight={400} color={"primary.400"} lineHeight={'16.93px'}>
                            {secondaryText}
                        </Text>
                        {
                            tertiaryText ? (
                                <Text fontSize={"11px"} fontWeight={400} color={"brand.400"} lineHeight={'13.02px'} mt={'7px'}>
                                    {tertiaryText}
                                </Text>
                            ) : null
                        }
                    </Flex>
                </Flex>
                {otherProps.children}
            </Flex>
        </Link>
    )
}

export default EntityCard;