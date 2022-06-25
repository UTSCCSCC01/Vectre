import React from 'react'
import { Flex, Spacer} from '@chakra-ui/react'

const boxBg = 'rgba(198, 219, 255, 0.36)'

export default function Notification({ fromUser, action }) {
  return (
    <Flex height={'36px'}>
        <Flex bg={boxBg} w={'36px'} borderRadius={6} justifyContent={'center'} align={'center'}>Img</Flex>
        <Spacer />
        <Flex bg={boxBg} w={'280px'} borderRadius={6} justifyContent={'center'} align={'center'}>
          <p><b>{fromUser}</b> {action}</p>
        </Flex>
    </Flex>
  )
}
