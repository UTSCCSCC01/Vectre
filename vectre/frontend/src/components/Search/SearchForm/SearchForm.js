import {
    Input,
    FormControl,
    IconButton,
    Flex
} from "@chakra-ui/react";
import { HiSearch } from 'react-icons/hi';

const SearchForm = ({
    handleSearchSubmit,
    setSearchInput
}) => {
    return (
        <form
            id="search-form"
            onSubmit={(event) => {
                event.preventDefault()
                handleSearchSubmit();
            }}
        >
            <Flex
                flexDirection={"row"}
                gap={'12px'}
                alignItems={'center'}
                height={'50px'}>
                <FormControl>
                    <Input
                        id={'search'}
                        backgroundColor={"white"}
                        px={'28px'}
                        py={'14px'}
                        height={'100%'}
                        fontSize={'20px'}
                        fontWeight={500}
                        color={'sub.400'}
                        border={'none'}
                        placeholder={"looking for something?"}
                        borderRadius={'19px'}
                        onChange={(event) => { setSearchInput(event.target.value === "" ? ".*" : event.target.value) }} />
                </FormControl>
                <IconButton
                    type={'submit'}
                    form={'search-form'}
                    height={'100%'}
                    width={'50px'}
                    color={"white"}
                    bg={"primary.400"}
                    borderRadius={'19px'}
                    icon={<HiSearch size={'1.5rem'} />} />
            </Flex>
        </form>
    )
}

export default SearchForm;