import ContentWithSideButtons from "../../components/Containers/ContentWithSideButtons";

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

const Community = ({
    communityName
}) => {
    return (
        <>
            <base href={`/c/${communityName}/`} />
            <ContentWithSideButtons sideButtonsList={communitySideButtonsList}>
                <div>{communityName} Page:</div>
            </ContentWithSideButtons>
        </>
    )
}

export default Community;