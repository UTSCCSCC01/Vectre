import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { BsGearWideConnected } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { loggedInUserRolesSelector } from '../../redux/selectors/communities';
import { loggedInUserSelector } from '../../redux/selectors/users';
import IconSquareButton from '../Buttons/IconSquareButton/IconSquareButton';
import TextButton from '../Buttons/TextButton/TextButton';
import GenericButtonsPopoverWrapper from '../Containers/GenericButtonsPopoverWrapper';
import GenericWarningModal, { GENERIC_WARNING_TYPE } from '../Modals/GenericWarningModal/GenericWarningModal';

const ModeratorSettingsPopover = ({
    item
}) => {

    const loggedInUser = useSelector(loggedInUserSelector);
    const loggedInUserRoles = useSelector(loggedInUserRolesSelector);

    const ModeratorSettingsButton = ({ onToggle }) => {
        return (
            <IconSquareButton
                icon={<BsGearWideConnected size={'1.5rem'} />}
                onClick={(e) => {
                    onToggle();
                    e.stopPropagation();
                }} />
        )
    }

    const buttonsList = [
        {
            isHidden: (loggedInUser.walletAddress === item.author.walletAddress) || (loggedInUserRoles.includes("moderator")),
            typeData: GENERIC_WARNING_TYPE.PROMOTE,
            onClick: () => console.log("promoting" + item.author.username)
        },
        {
            typeData: GENERIC_WARNING_TYPE.DELETE,
            onClick: () => console.log("deleting" + item.author.username)
        },
        {
            isHidden: loggedInUser.walletAddress === item.author.walletAddress,
            typeData: GENERIC_WARNING_TYPE.BAN,
            onClick: () => console.log("banning" + item.author.username)
        }
    ]

    const [type, setType] = useState(GENERIC_WARNING_TYPE.PROMOTE);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <GenericButtonsPopoverWrapper
                placement={'right-start'}
                margin={'0 0 0 20px'}
                buttons={
                    <>
                        {buttonsList.map((element, i) => (
                            <TextButton
                                key={i}
                                display={element.isHidden ? 'none' : 'inline-flex'}
                                height={'fit-content'}
                                py={'5px'}
                                width={'100%'}
                                color={'brand.400'}
                                fontSize={'13px'}
                                fontWeight={500}
                                bg={'rgba(228, 239, 255, 0.62)'}
                                text={element.typeData.title}
                                onClick={(e) => {
                                    setType(element.typeData);
                                    onOpen();
                                    e.stopPropagation();
                                }}
                                rightIcon={element.typeData.icon} />
                        ))}
                    </>}>
                <ModeratorSettingsButton />
            </GenericButtonsPopoverWrapper>
            <GenericWarningModal type={type} isOpen={isOpen} onClose={onClose} actionBtnOnClick={buttonsList.filter((element) => element.typeData === type)[0].onClick} />
        </>
    )
}

export default ModeratorSettingsPopover;