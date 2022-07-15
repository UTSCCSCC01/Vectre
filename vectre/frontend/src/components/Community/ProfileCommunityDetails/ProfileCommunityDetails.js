import ProfileUserDetailsTopComponent from '../../Profile/ProfileUserDetails/ProfileUserDetailsTopComponent/ProfileUserDetailsTopComponent';
import ProfileCommunityDetailsBotComponent from './ProfileCommunityDetailsBotComponent/ProfileCommunityDetailsBotComponent';

const ProfileCommunityDetails = ({
    communityData
}) => {
    return (
        <>
            <ProfileUserDetailsTopComponent props={{ user: communityData }} />
            <ProfileCommunityDetailsBotComponent communityData={communityData} />
        </>
    )
}

export default ProfileCommunityDetails;