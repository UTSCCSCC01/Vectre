import React from "react";

// Redux
import PropTypes from 'prop-types';
import {
    createUser,
    getLoginNonce,
    loginUser,
} from "../../redux/actions/users";
import {connect} from "react-redux";
import {nonceSelector} from "../../redux/selectors/users";

// Components
import PreLoginNavBar from "./PreLogin/PreLoginNavBar";
import PreLogin from "./PreLogin/PreLogin";
import RegisterUser from "./RegisterUser";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wallet_address: "",
            nonce: "",
            connecting: false,
        }
    }

    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.nonce !== this.props.nonce) {
            this.signNonce()
        }
    }

    isMetamaskInstalled = () => { return window.ethereum !== undefined }

    connectMetamask = async () => {
        this.setState({connecting: true})
        if (window.ethereum) {
            await window.ethereum.request({
                method: "eth_requestAccounts"
            })
                .then(accounts => {
                    const wallet_address = accounts[0]
                    this.setState({wallet_address: wallet_address})
                    this.props.getLoginNonce(wallet_address)
                })
                .catch(error => { console.log(error) }) // TODO: Handle when user did not login with their wallet
        }
        this.setState({connecting: false})
    }

    signNonce = async () => {
        if (window.ethereum) {
            const message = `Hi from Vectre! Sign this message to prove you have access to this wallet in order to log in.\n\nUnique ID: ${this.props.nonce}`

            await window.ethereum.request({
                method: 'personal_sign',
                params: [message, this.state.wallet_address]
            })
                .then(signature => {
                    this.props.loginUser(this.state.wallet_address, signature, (href) => { window.location.href = href})
                })
                .catch(error => { // TODO: Handle when user cancels signing page
                    console.log(error)
                    window.location.reload()
                })
        }
    }

    handleCreateUser = (newUser) => {
        this.props.createUser(newUser, (href) => { window.location.href = href})
    }

    render () {
        return (
            <div>
                <PreLoginNavBar />
                <PreLogin
                    connecting={this.state.connecting}
                    connected={this.state.wallet_address !== ""}
                    connectAccount={this.connectMetamask}
                    signNonce={this.signNonce}
                    isMetamaskInstalled={this.isMetamaskInstalled}
                />
                {(this.state.wallet_address !== "" && this.props.nonce === "") ?
                    <RegisterUser
                        createUser={this.handleCreateUser}
                        wallet_address={this.state.wallet_address}
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