import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import React from "react";

const GenericButtonsPopoverWrapper = ({
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
                    <>{React.cloneElement(otherProps.children, { onToggle: onToggle })}</>
                </PopoverTrigger>
                <PopoverContent
                    width={'180px'}
                    py={'16px'}
                    px={'13px'}>
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