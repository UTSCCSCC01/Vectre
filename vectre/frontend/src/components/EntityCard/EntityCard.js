import {
    Flex,
    Image,
    Link,
    Text
} from "@chakra-ui/react"
import { getAvatarOrDefault } from "../../utils/Utils";

const EntityCard = ({
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
        <Link key={key} _focus={{ boxShadow: "none" }} _hover={{ textDecoration: "none" }} href={href}>
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
                    <Image
                        bg={bg}
                        src={getAvatarOrDefault(data.profilePic)}
                        fit={'cover'}
                        overflow={'hidden'}
                        borderRadius={'full'}
                        boxSize={iconBoxSize} />
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