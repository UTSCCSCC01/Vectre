import {
    Box,
    IconButton
} from '@chakra-ui/react';

import { ReactComponent as LogoIcon } from '../../../assets/icons/logo-V.svg'

const VectreIcon = ({ transform }) => {
    return (
        <Box transform={transform}>
            <IconButton
                size='lg'
                background={'#F9FBFF'}
                icon={<LogoIcon height="3rem" filter={"drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"} />}
                boxShadow={'0px 30px 60px rgba(59, 130, 246, 0.25)'}
                aria-label={'logo'}
                isRound={'true'}
                cursor={'unset'}
                _focus={{ outline: 0 }}
                _hover={{ background: '#F9FBFF' }}
                _active={{ background: '#F9FBFF' }}>
            </IconButton>
        </Box>
    );
}

export default VectreIcon;