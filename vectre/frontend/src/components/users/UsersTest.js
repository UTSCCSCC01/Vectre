import React from "react";
import PropTypes from 'prop-types';
import { Button } from "@chakra-ui/react";
import { createUser, getUsers } from "../../redux/actions/users";
import { connect } from "react-redux";
import { usersSelector } from "../../redux/selectors/users";

class UsersTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    handleCreateUser = () => {
        const random = Math.random().toString(36).slice(2)
        let user = {
            name: "Tester " + random,
            username: "test_" + random,
            walletAddress: random
        }
        this.props.createUser(user)
    }

    render() {
        return (
            <div>
                <div>
                    <Button
                        colorScheme="pink"
                        variant="solid"
                        style={{ margin: 10 }}
                        onClick={this.props.getUsers}
                    >
                        Get users
                    </Button>
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        style={{ margin: 10 }}
                        onClick={this.handleCreateUser}
                    >
                        Create test user
                    </Button>
                </div>
                <div>
                    <h2>Users:</h2>
                    {this.props.users.map((user, index) =>
                        <div key={index}>
                            name: {user.name},
                            username: @{user.username},
                            walletAddress: {user.walletAddress} </div>
                    )}
                </div>

            </div>
        )
    }
}

const actionCreators = {
    getUsers,
    createUser
}
const mapStateToProps = (state, ownProps) => ({
    users: usersSelector(state)
})
UsersTest.propTypes = {
    users: PropTypes.array,
}
UsersTest.defaultProps = {
    users: [],
}
export default connect(
    mapStateToProps,
    actionCreators
)(UsersTest);