import ProfileUserDetailsTopComponent from './ProfileUserDetailsTopComponent/ProfileUserDetailsTopComponent';
import ProfileUserDetailsBotComponent from './ProfileUserDetailsBotComponent/ProfileUserDetailsBotComponent';

const ProfileUserDetails = ({
    props,
    handleUpdateUser,
    handleFollowUser,
    following
}) => {
    return (
        <>
            <ProfileUserDetailsTopComponent props={props} />
            <ProfileUserDetailsBotComponent props={props} handleUpdateUser={handleUpdateUser} handleFollowUser={handleFollowUser} following={following} />
        </>
    )
}

export default ProfileUserDetails;