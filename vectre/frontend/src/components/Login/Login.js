import React from "react";

// Redux
import PropTypes from 'prop-types';
import {
    createUser,
    getLoginNonce,
    loginUser,
} from "../../redux/actions/users";
import { connect } from "react-redux";
import { nonceSelector } from "../../redux/selectors/users";

// Components
import PreLoginNavBar from "./PreLogin/PreLoginNavBar";
import PreLogin from "./PreLogin/PreLogin";
import RegisterUser from "./RegisterUser";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            walletAddress: "",
            nonce: "",
            connecting: false,
            connected: false,
            registered: false,
            isRegisterModalOpen: true,
        }
    }

    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.nonce !== this.props.nonce) {
            this.setState({registered: true})
            this.signNonce()
        }
    }

    isMetamaskInstalled = () => { return window.ethereum !== undefined }

    connectMetamask = async () => {
        if (!this.state.connected) {
            this.setState({connecting: true})
            if (window.ethereum) {
                await window.ethereum.request({
                    method: "eth_requestAccounts"
                })
                    .then(accounts => {
                        const walletAddress = accounts[0]
                        this.setState({
                            walletAddress: walletAddress,
                            connected: walletAddress !== null
                        })
                        this.props.getLoginNonce(walletAddress)
                    })
                    .catch(error => {
                        console.log(error)
                    }) // TODO: Handle when user did not login with their wallet
            }
            this.setState({connecting: false})
        } else {
            this.setState({isRegisterModalOpen: true})
        }
    }

    signNonce = async () => {
        if (window.ethereum) {
            const message = `Hi from Vectre! Sign this message to prove you have access to this wallet in order to log in.\n\nUnique ID: ${this.props.nonce}`

            await window.ethereum.request({
                method: 'personal_sign',
                params: [message, this.state.walletAddress]
            })
                .then(signature => {
                    this.props.loginUser(this.state.walletAddress, signature, (href) => { window.location.href = href })
                })
                .catch(error => { // User cancels signing page
                    window.location.reload()
                })
        }
    }

    handleCreateUser = (newUser) => {
        this.props.createUser(newUser, (href) => { window.location.href = href })
    }

    handleOpenRegisterModal = () => {
        this.setState({ isRegisterModalOpen: true })
    }
    handleCloseRegisterModal = () => {
        this.setState({ isRegisterModalOpen: false })
    }

    render() {
        return (
            <div>
                <PreLoginNavBar />
                <PreLogin
                    connecting={this.state.connecting}
                    connected={this.state.connected}
                    registered={this.state.registered}
                    connectAccount={this.connectMetamask}
                    isMetamaskInstalled={this.isMetamaskInstalled}
                />
                {(this.state.walletAddress !== "" && this.props.nonce === "") ?
                    <RegisterUser
                        createUser={this.handleCreateUser}
                        walletAddress={this.state.walletAddress}
                        isModalOpen={this.state.isRegisterModalOpen}
                        openModal={this.handleOpenRegisterModal}
                        closeModal={this.handleCloseRegisterModal}
                    /> : null
                }
            </div>
        )
    }
}

const actionCreators = {
    getLoginNonce,
    loginUser,
    createUser
}
const mapStateToProps = (state, ownProps) => ({
    nonce: nonceSelector(state)
})
Login.propTypes = {
    nonce: PropTypes.string
}
Login.defaultProps = {
    nonce: "",
}
export default connect(
    mapStateToProps,
    actionCreators
)(Login);