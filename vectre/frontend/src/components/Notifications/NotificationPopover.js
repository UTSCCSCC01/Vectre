import React, { useState } from 'react'
import { IconButton, 
  PopoverTrigger, 
  Flex, 
  chakra, 
  Popover, 
  PopoverContent,
  PopoverHeader, 
  Portal 
} from '@chakra-ui/react'
import { MdNotificationsActive } from 'react-icons/md'
import Notifications from './Notifications'
import './Notification.css'

export default function NotificationPopover() {
  const [hasUnread, setHasUnread] = useState(false)
  return (
    <Popover closeOnBlur={true} offset={[-100, 10]} >
      <PopoverTrigger>
        <IconButton 
          size={'lg'}
          transform={'scale(1.2)'}
          color={'primary.400'}
          isRound={'true'}
          bg={'white'}
          _focus={{ outline: 0 }}
          icon={
            <>
            <MdNotificationsActive size="1.5rem" />
            { hasUnread && 
            <chakra.span className="unread-big-marker" rounded="full" >
              </chakra.span>}
            </>
          }
        >
        </IconButton>
      </PopoverTrigger>
      <Portal>
        <PopoverContent className="popover" color='primary.400'>
          <PopoverHeader border='0' alignItems={'center'} justifyContent={'center'} display={'inline-flex'}>
            <Flex className="header" flexDir={'row'}>
              <p>Notifications</p>
              <MdNotificationsActive/>
            </Flex>
          </PopoverHeader>
          <Notifications hasUnread={hasUnread} setHasUnread={setHasUnread}/>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
