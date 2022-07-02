import {
   Flex,
   Button,
} from '@chakra-ui/react';

import { RiDashboard2Line } from 'react-icons/ri'

const PostTopComponent = ({
}) => {
   return (
      <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'center'}>
         <Button
            display={{ base: 'none', lg: 'inline-flex' }}
            px={'17.5px'}
            fontSize={'18px'}
            fontWeight={700}
            alignSelf={'center'}
            _hover={{ textDecoration: "none" }}
            alignItems={'center'}
            color={'primary.400'}
            bg={'white'}
            leftIcon={<RiDashboard2Line size="1.5rem" />}
            _focus={{ outline: 0 }}>
            NFT Dashboard
         </Button>
      </Flex>
   );
};

export default PostTopComponent;