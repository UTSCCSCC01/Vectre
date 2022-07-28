import TextButton from "../TextButton/TextButton"

const ToggleHollowButton = ({
    isOn,
    onClick,
    onText,
    offText,
    fontSize = '10px',
    fontWeight = 400,
    px = '12.5px',
    py = '4.5px',
    width = '70px',
    height = 'unset',
    ...otherProps
}) => {
    return (
        <TextButton
            fontSize={fontSize}
            fontWeight={fontWeight}
            lineHeight={'13.02px'}
            px={px}
            py={py}
            text={isOn ? onText : offText}
            bg={isOn ? 'primary.400' : 'white'}
            color={isOn ? 'white' : 'primary.400'}
            border={'1px solid #3B82F6'}
            width={width}
            onClick={(event) => {
                event.preventDefault();
                onClick();
            }}
            height={height}
            {...otherProps} />
    )
}

export default ToggleHollowButton;
