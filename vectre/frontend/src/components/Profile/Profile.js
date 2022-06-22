import React from "react";

// Redux
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {
    getLoggedInUser,
    getUser,
    updateUser,
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

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
    }

    componentDidMount() {
        this.props.getUser(this.props.profileWalletAddress) // Profile owner
        this.props.getLoggedInUser()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleOpenModal = () => { this.setState({isModalOpen: true}) }
    handleCloseModal = () => { this.setState({isModalOpen: false}) }

    handleUpdateUser = (newUser) => {
        this.props.updateUser(this.props.loggedInUser.wallet_address, newUser, (href) => { window.location.href = href})
    }

    render () {
        return (
            <div>
                <h1><b>Profile:</b></h1>
                {!this.props.user.wallet_address ? `User ${this.props.profileWalletAddress} does not exist!`
                    :
                    <>
                        <div>
                            <b>wallet_address:</b> {this.props.user.wallet_address} <br></br>
                            <b>username:</b> @{this.props.user.username} <br></br>
                            <b>name</b>: {this.props.user.name} <br></br>
                            <b>bio</b>: {this.props.user.bio} <br></br>

                            <br></br>
                            <b>Following</b>: <br></br>
                            {this.props.user.following.map(wallet_address =>
                                <>
                                    - <Link href={"/user/" + wallet_address}>{wallet_address}</Link><br></br>
                                </>
                            )}

                            <br></br>
                            <b>Followers</b>: <br></br>
                            {this.props.user.followers.map(wallet_address =>
                                <>
                                    - <Link href={"/user/" + wallet_address}>{wallet_address}</Link><br></br>
                                </>
                            )}
                            <br></br>
                        </div>

                        {/* Display edit profile is logged in user is same as profile being viewed */}
                        {this.props.loggedInUser.wallet_address === this.props.profileWalletAddress ?
                            <>
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
                            </> : null
                        }
                    </>
                }
            </div>
        )
    }
}

const actionCreators = {
    getLoggedInUser,
    getUser,
    updateUser
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