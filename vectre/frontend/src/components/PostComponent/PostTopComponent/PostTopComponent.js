import {
    Box,
    Flex,
    Image,
    Link
} from '@chakra-ui/react';

import VerifiedIcon from '../../../assets/icons/verified-icon.svg';
import DefaultAvatar from '../../../assets/images/default-avatar.png';
import TextButton from '../../Buttons/TextButton/TextButton'
import { formatISO } from '../../../utils/Utils'
import { useSelector } from 'react-redux';
import { loggedInUserRolesSelector } from '../../../redux/selectors/communities';
import ModeratorSettingsPopover from '../../ModeratorSettingsPopover/ModeratorSettingsPopover';

const PostTopComponent = ({
    fromRepost,
    item,
}) => {
    const loggedInUserRoles = useSelector(loggedInUserRolesSelector);
    return (
        <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'space-between'}>
            <Flex gap={'10px'}>
                <Link
                    href={"/user/" + item.author.walletAddress}
                    _hover={{ textDecoration: "none" }}>
                    <TextButton
                        text={item.author.username}
                        px={'17.5px'}
                        fontSize={'18px'}
                        fontWeight={700}
                        leftIcon={
                            <Image
                                src={item.author.profilePic}
                                fallbackSrc={DefaultAvatar}
                                fit={'cover'}
                                overflow={'hidden'}
                                borderRadius={'full'}
                                boxSize={'32px'} />
                        } />
                </Link>
                <Box
                    display={item.verified ? 'inline-flex' : 'none'}
                    px={'8px'}
                    py={'3px'}
                    fontSize={'18px'}
                    fontWeight={700}
                    color={'rgb(242,172,88)'}
                    bg={'white'}
                    borderRadius={'6px'}
                    alignItems={'center'}>
                    <Image src={VerifiedIcon} boxSize={'1.5rem'} />
                </Box>
            </Flex>
            <Flex gap={'10px'}>
                <Box
                    display={item.timestamp ? 'inline-flex' : 'none'}
                    px={'17.5px'}
                    fontSize={'12px'}
                    fontWeight={500}
                    color={'primary.400'}
                    bg={'white'}
                    borderRadius={'6px'}
                    alignItems={'center'}>
                    {formatISO(item.timestamp)}
                </Box>
                {
                    !fromRepost && loggedInUserRoles && loggedInUserRoles.includes("moderator") ? (
                        <ModeratorSettingsPopover item={item} />
                    ) : null
                }
            </Flex>
        </Flex>
    );
};

export default PostTopComponent;