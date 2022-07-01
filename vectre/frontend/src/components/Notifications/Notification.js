import React from 'react'
import { 
  Flex, 
  Spacer, 
  Box, 
  chakra,
  Avatar
 } from '@chakra-ui/react'
import './Notification.css'
import { FaCommentAlt, FaHeart } from 'react-icons/fa'
import { ImUserPlus } from 'react-icons/im'
import { ReactComponent as LikeIcon } from '../../assets/icons/like-icon.svg'
import DEFAULT_PROFILE_PICTURE from "../../assets/images/default_profile_pic.jpg"

// Redux
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { readNotification } from "../../redux/actions/notification";
import { getUser } from "../../redux/actions/users"
import { userSelector } from "../../redux/selectors/users"

class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: "",
      icon: ""
    }
  }

  componentDidMount() {
    this.props.getUser(this.props.fromUser)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userProfile !== this.props.userProfile) {
      this.formatMessage()
    }
  }

  formatMessage() {
    let messageEnd = undefined
    switch (this.props.action) {
      case 'like':
        this.setState( {icon: <FaHeart size={"18px"}/>} )
        messageEnd = "liked your post."
        break
      case 'comment':
        this.setState( {icon: <FaCommentAlt size={"18px"}/>} )
        messageEnd = "commented on your post."
        break
      case 'follow':
        this.setState( {icon: <ImUserPlus size={"22px"}/>} )
        messageEnd = "followed you."
        break
    }
    let newMessage = <><b>@{this.props.userProfile.username}</b> {messageEnd}</>
    this.setState({message: newMessage})
  }

  handleRead = () => {
    this.props.readNotification(this.props.id)
  }

  render() {
    return(
      <Box className={'notif-box'} _hover={{bg: "rgba(200, 200, 200, 0.3)", borderRadius: "6px"}}
          as='a' href={this.props.link} onClick={this.handleRead}>
        <Flex className='notif-icon' position='relative'>
          {this.state.icon} 
          {!this.props.read && <chakra.span className='unread-small-marker' rounded='full'></chakra.span>}
        </Flex>
        <Spacer />
        <Flex className='notif-tag'>
            {/* TODO: add avatar from props.userProfile instead. */}
            <Avatar src={DEFAULT_PROFILE_PICTURE}
              size="sm"
              mx="15px"
            />
            <Box noOfLines={1} textAlign={"left"}><p>{this.state.message}</p></Box>
        </Flex>
      </Box>
    )
  }
}

const actionCreators = {
  readNotification,
  getUser
}

const mapStateToProps = (state, ownProps) => ({
  userProfile: userSelector(state)
})

Notification.propTypes = {
  userProfile: PropTypes.object
}

Notification.defaultProps = {
  userProfile: {}
}

export default connect(
  mapStateToProps,
  actionCreators
)(Notification);
