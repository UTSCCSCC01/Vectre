import {
    FormControl,
    FormLabel,
    Textarea
} from '@chakra-ui/react'

const FormTextArea = ({
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
            <Textarea
                id={inputID}
                defaultValue={inputDefaultValue}
                fontSize={'18px'}
                bg={'rgba(198, 219, 255, 0.32)'}
                border={'none'}
                resize={'none'}
                size={'md'}
                minHeight={'140px'}
                _placeholder={{ fontWeight: '700', color: 'sub.400' }} />
        </FormControl>
    )
}

export default FormTextArea;