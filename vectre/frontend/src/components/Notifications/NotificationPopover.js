import React from 'react'
import { IconButton, PopoverTrigger, Flex } from '@chakra-ui/react'
import { MdNotificationsActive } from 'react-icons/md'
import { Popover, PopoverContent, PopoverHeader, Portal } from '@chakra-ui/react'
import Notifications from './Notifications'

export default function NotificationPopover() {
  return (
    <Popover closeOnBlur={true} offset={[-100, 10]} >
      <PopoverTrigger>
        <IconButton 
          size={'lg'}
          transform={'scale(1.2)'}
          color={'primary.400'}
          isRound={'true'}
          bg={'white'}
          icon={<MdNotificationsActive size="1.5rem" />}
          _focus={{ outline: 0 }}>
        </IconButton>
      </PopoverTrigger>
      <Portal>
        <PopoverContent borderRadius={'sm'} width={'389px'} height={'60vh'} color={'primary.400'}>
          <PopoverHeader border='0' alignItems={'center'} justifyContent={'center'} display={'inline-flex'}>
            <Flex fontWeight={'bold'} fontSize={18}
                  flexDir={'row'} justifyContent={'center'}
                  alignItems={'center'} px={'38px'} py={'4px'} gap={2}
                  h={'fit-content'} w={'fit-content'}
                  bg={'rgba(198, 219, 255, 0.36)'} borderRadius={6}
                  display={'inline-flex'}>
              <p>Notifications</p>
              <MdNotificationsActive/>
            </Flex>
          </PopoverHeader>
          <Notifications/>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
