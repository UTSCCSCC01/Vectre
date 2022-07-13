import ContentWithSideButtons from "../../components/Containers/ContentWithSideButtons";
import ProfileCommunityDetails from "./ProfileCommunityDetails/ProfileCommunityDetails"

const communitySideButtonsList = [
    {
        text: "Create a Proposal",
        func: () => { console.log("Creating a proposal...") }
    },
    {
        text: "Vote for a Proposal",
        func: () => { console.log("Voting for a proposal...") }
    },
    {
        text: "Moderator Settings",
        link: "settings"
    }
]

const sampleCommunityData = {
    communityID: "Doodles",
    name: "Doodles Community",
    bio: "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury.",
    memberCount: 1115000,
    profilePic: "https://lh3.googleusercontent.com/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ=s168",
    banner: "https://lh3.googleusercontent.com/svc_rQkHVGf3aMI14v3pN-ZTI7uDRwN-QayvixX-nHSMZBgb1L1LReSg1-rXj4gNLJgAB0-yD8ERoT-Q2Gu4cy5AuSg-RdHF9bOxFDw=h600",
    discordLink: "https://discord.com/invite/doodles",
    instagramLink: "",
    twitterLink: "https://twitter.com/doodles",
    websiteLink: "https://doodles.app/",
    ethLink: "https://etherscan.io/address/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
}

const Community = ({
    communityName
}) => {
    return (
        <>
            <base href={`/c/${communityName}/`} />
            <ContentWithSideButtons sideButtonsList={communitySideButtonsList}>
                <ProfileCommunityDetails communityData={sampleCommunityData} />
            </ContentWithSideButtons>
        </>
    )
}

export default Community;