import { Box, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import Notification from './Notification'
import './Notification.css'

// Redux
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getLoggedInUser, getNotifications } from "../../redux/actions/users";
import { loggedInUserSelector, notificationsSelector, unreadStatusSelector } from "../../redux/selectors/users";

class Notifications extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recent: [],
      past: [],
    }
  }

  componentDidMount() {
    this.props.getLoggedInUser()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.loggedInUser !== this.props.loggedInUser) {
      this.props.getNotifications(this.props.loggedInUser.walletAddress)
    }
    if (prevProps.notifications !== this.props.notifications) {
      // console.log(this.props.notifications)
      // console.log(this.props.unreadStatus)
      this.categorise(this.props.notifications)
      this.props.setHasUnread(this.props.unreadStatus)
    }
  }
  
  categorise(allNotifications) {
    // reset the state before catagorise
    this.setState( { recent:[], past: []} )

    const currentTime = new Date()
    allNotifications.map(n => {
      // Calculate time difference.
      // TODO: use utils method to calculate hour difference
      let notifTime = new Date(n.timestamp)
      let hoursDif = (currentTime - notifTime) / (1000 * 3600)
      if (hoursDif <= 24) {
        this.setState({ recent: [...this.state.recent, n] })
      } else {
        this.setState({ past: [...this.state.past, n] })
      }
    })
  }
  
  makeNotification(notification) {
    return(
      <Notification fromUser={notification.fromUser}
        action={notification.action}
        read={notification.read}
        link={notification.link}
        key={notification.notificationID}
        notificationID={notification.notificationID}
      />
    )
  }

  render() {
    // Use `sampleNotifications` temporary
    //this.categorise(sampleNotifications)

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

const actionCreators = {
  getLoggedInUser,
  getNotifications
}
const mapStateToProps = (state, ownProps) => ({
  loggedInUser: loggedInUserSelector(state),
  notifications: notificationsSelector(state),
  unreadStatus: unreadStatusSelector(state)
})
Notifications.propTypes = {
  loggedInUser: PropTypes.object,
  notifications: PropTypes.array,
  unreadStatus: PropTypes.bool
}
Notifications.defaultProps = {
  loggedInUser: {},
  notifications: [],
  unreadStatus: false
}

export default connect(
  mapStateToProps,
  actionCreators
)(Notifications);