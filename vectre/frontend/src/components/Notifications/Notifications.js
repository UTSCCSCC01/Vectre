import { Box, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import Notification from './Notification'
import './Notification.css'

const sampleNotifications = [
  {
    fromUser: "@johnny",
    action: "liked",
    timestamp: "2022-06-22T21:12:57.000Z",
    read: true,
    link: "https://google.com/notif1"
  },
  {
    fromUser: "@Peter",
    action: "commented",
    timestamp: "2022-06-22T21:12:57.000Z",
    read: true,
    link: "https://google.com/notif2"
  },
  {
    fromUser: "@Peter",
    action: "commented",
    timestamp: "2022-06-22T21:12:57.000Z",
    read: true,
    link: "https://google.com/notif3"
  },
  {
    fromUser: "@Peter",
    action: "followed",
    timestamp: "2022-06-22T21:12:57.000Z",
    read: true,
    link: "https://google.com/notif4"
  }
]

export default class Notifications extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recent: [],
      past: [],
    }
  }
  
  catagorise(allNotifications) {
    // reset the state before catagorise
    // this.setState( { recent:[], past: []} )
    this.state.past = []
    this.state.recent = []

    const currentTime = new Date()
    for (let n of allNotifications) {
      // Update the unRead state
      if (!n.read) {
        this.props.setHasUnread(true)
      }
      // Calculate time difference.
      let notifTime = new Date(n.timestamp)
      let hoursDif = (currentTime - notifTime) / (1000 * 3600)
      if (hoursDif <= 24) {
        this.state.recent.push(n)
      } else {
        this.state.past.push(n)
      }
    }
  }
  
  makeNotification(notification) {
    return(
      <Notification fromUser={notification.fromUser}
        action={notification.action}
        read={notification.read}
        link={notification.link}
      />
    )
  }

  render() {
    // Use `sampleNotifications` temporary
    this.catagorise(sampleNotifications)

    return (
      
      <Box display={'table-column'} px={'30px'} pt={'7px'} pb={'25px'} 
          justifyContent={'center'} align={'center'} overflowY={'overlay'}>
        
        {this.state.hasUnread && <h1>Unread</h1>}
        
        {this.state.recent.length !== 0 &&
          <>
          <Flex className='time-tag'>Today</Flex>

          <Stack direction={'column'} pt={'9px'} pb={'30px'} spacing={'5px'} fontSize={'10px'}>
            {this.state.recent.map(this.makeNotification)}
          </Stack>
          </>
        }

        {this.state.past.length !== 0 &&
          <>
          <Flex className='time-tag'>This Week</Flex>

          <Stack direction={'column'} pt={'15px'} spacing={'6px'} fontSize={'10px'}>
            {this.state.past.map(this.makeNotification)}
          </Stack>
          </>
        }
      </Box>
    )
  }
}