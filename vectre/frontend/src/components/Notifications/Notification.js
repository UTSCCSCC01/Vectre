import React from 'react'
import { Flex, Spacer, Box, chakra } from '@chakra-ui/react'
import './Notification.css'
import { FaCommentAlt } from 'react-icons/fa'
import { ImUserPlus } from 'react-icons/im'
import { ReactComponent as LikeIcon } from '../../assets/icons/like-icon.svg'

// Redux
import { connect } from "react-redux";
import { readNotification } from "../../redux/actions/notification";

class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.id = props.notificationID
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
      case 'like':
        this.icon = <LikeIcon/>
        messageEnd = "liked your post."
        break
      case 'comment':
        this.icon = <FaCommentAlt/>
        messageEnd = "commented on your post."
        break
      case 'follow':
        this.icon = <ImUserPlus/>
        messageEnd = "followed you."
        break
      default:
        this.icon = "icon"
        messageEnd = ""
    }
    this.message = <><b>{this.fromUser}</b> {messageEnd}</>
  }

  handleRead = () => {
    this.props.readNotification(this.id)
  }

  render() {
    return(
      <Box className={'notif-box'} _hover={{bg: "rgba(200, 200, 200, 0.3)", borderRadius: "6px"}}
          as='a' href={this.link} onClick={this.handleRead}>
        <Flex className='notif-icon' position='relative'>
          {this.icon} 
          {!this.read && <chakra.span className='unread-small-marker' rounded='full'></chakra.span>}
        </Flex>
        <Spacer />
        <Flex className='notif-message'>
          <p>{this.message}</p>
        </Flex>
      </Box>
    )
  }
}

const actionCreators = {
  readNotification
}

const mapStateToProps = (state, ownProps) => ({})

export default connect(
  mapStateToProps,
  actionCreators
)(Notification);
