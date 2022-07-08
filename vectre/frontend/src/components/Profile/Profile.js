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
import {
    Button,
    Link,
} from "@chakra-ui/react";
import ProfileEditModal from "../Modals/ProfileEditModal/ProfileEditModal";
import Dashboard from "../Dashboard/Dashboard"

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
            this.props.unfollowUser(this.props.profileWalletAddress)
        } else { // Follow
            this.props.followUser(this.props.profileWalletAddress)
        }
    }

    render() {
        return (
            <div>
                {!this.props.user.walletAddress ? `User ${this.props.profileWalletAddress} does not exist!`
                    :
                    <>
                        <h1><b>Profile:</b></h1>
                        <div>
                            <b>walletAddress:</b> {this.props.user.walletAddress} <br></br>
                            <b>username:</b> @{this.props.user.username} <br></br>
                            <b>name</b>: {this.props.user.name} <br></br>
                            <b>bio</b>: {this.props.user.bio} <br></br>

                            <br></br>
                            <b>Following</b>: <br></br>
                            {this.props.user.following.map(following =>
                                <>
                                    - <Link href={"/user/" + following.walletAddress}>@{following.username}</Link><br></br>
                                </>
                            )}

                            <br></br>
                            <b>Followers</b>: <br></br>
                            {this.props.user.followers.map(follower =>
                                <>
                                    - <Link href={"/user/" + follower.walletAddress}>@{follower.username}</Link><br></br>
                                </>
                            )}
                            <br></br>
                        </div>

                        {/* Display edit profile is logged in user is same as profile being viewed */}
                        {this.props.loggedInUser.walletAddress === this.props.profileWalletAddress ?
                            <>
                                {/* Edit user profile */}
                                <Button
                                    onClick={this.handleOpenModal}>
                                    Edit User Profile
                                </Button>
                                <ProfileEditModal
                                    loggedInUser={this.props.loggedInUser}
                                    updateUser={this.handleUpdateUser}
                                    isOpen={this.state.isModalOpen}
                                    openModal={this.handleOpenModal}
                                    closeModal={this.handleCloseModal}
                                />
                            </> :
                            <>
                                {/* Follow */}
                                <Button
                                    onClick={this.handleFollowUser}>
                                    {this.state.following ? "Unfollow" : "Follow"}
                                </Button>
                            </>
                        }
                        {(this.props.loggedInUser.walletAddress === this.props.profileWalletAddress || this.props.user.dashboard !== "[]") ? // Only show empty dashboard if its your own
                            <Dashboard
                                loggedInUser={this.props.loggedInUser}
                                profileWalletAddress={this.props.profileWalletAddress}
                                currentDashboard={this.props.user.dashboard}
                            /> : null
                        }
                    </>
                }
            </div>
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