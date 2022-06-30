import {
    Flex,
    Link
} from '@chakra-ui/react';

import { TiArrowLeft, TiArrowRight } from 'react-icons/ti';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import TextButton from '../../Buttons/TextButton/TextButton'

const DashboardBot = ({
    onOpen,
    item,
}) => {
    return (
        <Flex 
            flexDirection={'row'} 
            alignContent={'center'} 
            justifyContent={'center'}>
            <Link
                _hover={{ textDecoration: "none" }}>
                <TextButton
                    onClick={onOpen}
                    text={`Select NFTs To Display`}
                    px={'17.5px'}
                    fontSize={'18px'}
                    fontWeight={700}
                    color={'white'}
                    bg={'primary.400'}
                    rightIcon={<BsFillCheckCircleFill />} />
            </Link>
        </Flex>
    );
};

export default DashboardBot;