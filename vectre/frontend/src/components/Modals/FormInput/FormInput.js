import {
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'

const FormInput = ({
    inputID,
    inputDefaultValue,
    inputLabelText,
    isRequired
}) => {
    return (
        <FormControl
            isRequired={isRequired}
            pt={'12px'}>
            <FormLabel
                htmlFor={inputID}
                color={'primary.400'}
                fontWeight={700}
                fontSize={'20px'}
                mb={'3px'}>
                {inputLabelText}
            </FormLabel>
            <Input
                id={inputID}
                defaultValue={inputDefaultValue}
                fontSize={'18px'}
                bg={'rgba(198, 219, 255, 0.32)'}
                border={'none'} />
        </FormControl>
    )
}

export default FormInput;