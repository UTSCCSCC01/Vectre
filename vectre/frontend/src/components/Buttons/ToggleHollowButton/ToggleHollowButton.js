import TextButton from "../TextButton/TextButton"

const ToggleHollowButton = ({
    borderAccent = "#3B82F6",
    accent = "#3B82F6",
    isOn,
    onClick,
    onText,
    offText,
    fontSize = '11px',
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
            bg={isOn ? accent : 'white'}
            color={isOn ? 'white' : accent}
            border={'1px solid ' + borderAccent}
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
