import { Box, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import Notification from './Notification'

const boxBg = 'rgba(198, 219, 255, 0.36)'

const sampleNotifications = [
  {
    fromUser: "@johnny",
    action: "liked",
    timestamp: "2022-06-22T21:12:57.000Z"
  },
  {
    fromUser: "@Peter",
    action: "commented",
    timestamp: "2022-06-22T21:12:57.000Z"
  },
  {
    fromUser: "@Peter",
    action: "commented",
    timestamp: "2022-06-22T21:12:57.000Z"
  },
  {
    fromUser: "@Peter",
    action: "commented",
    timestamp: "2022-06-22T21:12:57.000Z"
  },
  {
    fromUser: "@Peter",
    action: "commented",
    timestamp: "2022-06-22T21:12:57.000Z"
  },
  {
    fromUser: "@Peter",
    action: "commented",
    timestamp: "2022-06-22T21:12:57.000Z"
  },
  {
    fromUser: "@Peter",
    action: "commented",
    timestamp: "2022-06-22T21:12:57.000Z"
  },
  {
    fromUser: "@Peter",
    action: "commented",
    timestamp: "2022-06-22T21:12:57.000Z"
  },
  {
    fromUser: "@Peter",
    action: "commented",
    timestamp: "2022-06-22T21:12:57.000Z"
  }
]

function makeRecentPost(notification) {
  const currentTime = new Date()
  const postTime = new Date(notification.timestamp)
  const hoursDif = (currentTime - postTime) / (1000 * 3600)

  if ( (hoursDif <= 24) ) {
    return (
      <Notification fromUser={notification.fromUser}
        action={notification.action}/>
    );
  }
}

function makePastPost(notification) {
  const currentTime = new Date()
  const postTime = new Date(notification.timestamp)
  const hoursDif = (currentTime - postTime) / (1000 * 3600)

  if ( (hoursDif > 24) ) {
    return (
      <Notification fromUser={notification.fromUser}
        action={notification.action}/>
    );
  }
}

export default function Notifications() {
  return (
    <Box display={'table-column'} px={'30px'} pt={'7px'} pb={'25px'} 
         justifyContent={'center'} align={'center'} overflowY={'overlay'}>
      <Flex justifyContent={'center'} align={'center'}
            bg={boxBg} borderRadius={6}
            fontSize={'12px'} fontWeight={'500'}
            height={'fit-content'} py={1}>
        <div>Today</div>
      </Flex>

      <Stack direction={'column'} pt={'9px'} pb={'30px'} spacing={'5px'} fontSize={'10px'}>
        {sampleNotifications.map(makeRecentPost)}
      </Stack>

      <Flex justifyContent={'center'} align={'center'}
            bg={boxBg} borderRadius={6}
            fontSize={'12px'} fontWeight={'500'}
            height={'fit-content'} py={1}>
        <div>This Week</div>
      </Flex>

      <Stack direction={'column'} pt={'15px'} spacing={'6px'} fontSize={'10px'}>
        {sampleNotifications.map(makePastPost)}
      </Stack>
    </Box>
  )
}
