import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import React from "react";

const GenericButtonsPopoverWrapper = ({
    margin,
    placement,
    buttons,
    ...otherProps
}) => {
    const { isOpen, onToggle, onClose } = useDisclosure()
    return (
        <>
            <Popover
                placement={placement}
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={onClose}>
                <PopoverTrigger>
                    <div>{React.cloneElement(otherProps.children, { onToggle: onToggle })}</div>
                </PopoverTrigger>
                <PopoverContent
                    margin={margin}
                    width={'180px'}
                    py={'16px'}
                    px={'13px'}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}>
                    <Stack
                        gap="5px" justifyContent={"center"}>
                        {buttons}
                    </Stack>
                </PopoverContent>
            </Popover>
        </>
    );
}

export default GenericButtonsPopoverWrapper;