import React from 'react'
import { Flex, Spacer, Box } from '@chakra-ui/react'
import './Notification.css'
import { FaCommentAlt } from 'react-icons/fa'
import { ImUserPlus } from 'react-icons/im'
import { ReactComponent as LikeIcon } from '../../assets/icons/like-icon.svg'

export default class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.fromUser = props.fromUser
    this.action = props.action
    this.link = props.link
    this.read = props.read
    this.message = undefined
    this.icon = undefined
    this.formatMessage()
  }

  formatMessage() {
    let messageEnd = undefined
    switch (this.action) {
      case 'liked':
        this.icon = <LikeIcon/>
        messageEnd = "your post."
        break
      case 'commented':
        this.icon = <FaCommentAlt/>
        messageEnd = "on your post."
        break
      case 'followed':
        this.icon = <ImUserPlus/>
        messageEnd = "you."
        break
      default:
        this.icon = "icon"
        messageEnd = ""
    }
    this.message = <><b>{this.fromUser}</b> {this.action} {messageEnd}</>
  }

  render() {
    return(
      <Box className={'notif-box'} _hover={{bg: "rgba(200, 200, 200, 0.3)"}}
          as='a' href={this.link}>
        <Flex className='notif-icon'>{this.icon}</Flex>
        <Spacer />
        <Flex className='notif-message'>
          <p>{this.message}</p>
        </Flex>
      </Box>
    )
  }
}
