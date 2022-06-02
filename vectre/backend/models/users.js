const User = require('../models/neo4j/user')

const deleteUser = (session, wallet_address) => {
    return session.writeTransaction(transaction =>
        transaction.run(
            'MATCH (user:User {wallet_address: $wallet_address}) DETACH DELETE user',
            {wallet_address: wallet_address}
        )
    )
}

module.exports = {
    deleteUser: deleteUser
}