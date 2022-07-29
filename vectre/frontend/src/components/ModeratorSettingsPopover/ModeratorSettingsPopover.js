import { RiSettings5Fill } from 'react-icons/ri';
import IconSquareButton from '../Buttons/IconSquareButton/IconSquareButton';
import TextButton from '../Buttons/TextButton/TextButton';
import GenericButtonsPopoverWrapper from '../Containers/GenericButtonsPopoverWrapper';
import { GENERIC_WARNING_TYPE } from '../Modals/GenericWarningModal/GenericWarningModal';

const ModeratorSettingsPopover = ({
    item
}) => {
    const ModeratorSettingsButton = ({ onToggle }) => {
        return (
            <IconSquareButton
                icon={<RiSettings5Fill size={'1.5rem'} />}
                onClick={(e) => {
                    onToggle();
                    e.stopPropagation();
                }} />
        )
    }

    const buttonsList = [
        {
            typeData: GENERIC_WARNING_TYPE.PROMOTE,
            onClick: () => console.log("promoting" + item.author.username)
        },
        {
            typeData: GENERIC_WARNING_TYPE.DELETE,
            onClick: () => console.log("deleting" + item.author.username)
        },
        {
            typeData: GENERIC_WARNING_TYPE.BAN,
            onClick: () => console.log("banning" + item.author.username)
        }
    ]

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
                                height={'fit-content'}
                                py={'5px'}
                                width={'100%'}
                                color={'brand.400'}
                                fontSize={'13px'}
                                fontWeight={500}
                                bg={'rgba(228, 239, 255, 0.62)'}
                                text={element.typeData.title}
                                onClick={(e) => {
                                    element.onClick();
                                    e.stopPropagation();
                                }}
                                rightIcon={element.typeData.icon} />
                        ))}
                    </>}>
                <ModeratorSettingsButton />
            </GenericButtonsPopoverWrapper>
        </>
    )
}

export default ModeratorSettingsPopover;