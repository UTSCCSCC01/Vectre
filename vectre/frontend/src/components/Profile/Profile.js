import React from "react";

// Redux
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
    getUser,
    updateUser,
    followUser,
    unfollowUser,
} from "../../redux/actions/users";
import {
    loggedInUserSelector,
    userSelector,
} from "../../redux/selectors/users";

// Components
import ProfileUserDetails from "./ProfileUserDetails/ProfileUserDetails";
class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            following: false
        }
    }

    componentDidMount() {
        this.props.getUser(this.props.profileWalletAddress) // Profile owner
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loggedInUser !== this.props.loggedInUser) {
            this.setState({
                following: this.props.loggedInUser.following.some(following => following.walletAddress === this.props.profileWalletAddress)
            })
        }
    }

    handleOpenModal = () => { this.setState({ isModalOpen: true }) }
    handleCloseModal = () => { this.setState({ isModalOpen: false }) }

    handleUpdateUser = (newUser) => {
        this.props.updateUser(this.props.loggedInUser.walletAddress, newUser)
    }
    handleFollowUser = () => {
        if (this.state.following) { // Unfollow
            this.props.unfollowUser(this.props.profileWalletAddress, this.props.profileWalletAddress)
        } else { // Follow
            this.props.followUser(this.props.profileWalletAddress, this.props.profileWalletAddress)
        }
    }

    render() {
        return (
            <>
                <base href={`/user/${this.props.profileWalletAddress}/`} />
                {!this.props.user.walletAddress ? `User ${this.props.profileWalletAddress} does not exist!`
                    : <ProfileUserDetails props={this.props} handleUpdateUser={this.handleUpdateUser} handleFollowUser={this.handleFollowUser} following={this.state.following} />
                }
            </>
        )
    }
}

const actionCreators = {
    getUser,
    updateUser,
    followUser,
    unfollowUser,
}
const mapStateToProps = (state, ownProps) => ({
    loggedInUser: loggedInUserSelector(state),
    user: userSelector(state)
})
Profile.propTypes = {
    loggedInUser: PropTypes.object,
    user: PropTypes.object
}
Profile.defaultProps = {
    loggedInUser: {},
    user: {}
}
export default connect(
    mapStateToProps,
    actionCreators
)(Profile);