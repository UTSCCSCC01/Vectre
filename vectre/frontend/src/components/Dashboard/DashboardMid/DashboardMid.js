import {
    Box,
    Image,
    Grid
} from '@chakra-ui/react';

const dashboardPreset = [
    {
        "tokenID": 77809613,
        "name": "Ryder Ripps Bored Ape Yacht Club",
        "imageURL": "https://lh3.googleusercontent.com/uCKMr5LZBAfr49-dFuMrWc903x-u4NxBpPywwLjLS9DLMWZDfmjPJW6vlj584SfE2R1YaTgwNd6I6a-Yp90JvoEEpyBd6VhSvf4U",
        "contractAddress": "0x15545614507f46d954ab1f9c472e26506a99c5f8"
    },
    {
        "tokenID": 77809597,
        "name": "Ryder Ripps Bored Ape Yacht Club",
        "imageURL": "https://lh3.googleusercontent.com/HHMN3WLcecCy79ihWzJnUMd-UGlYUTKlRAPues77hRoRlP8B5mbWBS2gvlcqNmiLf_8HCmaVXT1cfX2uS1ATeAg8sATVqvEw4mwa",
        "contractAddress": "0x15545614507f46d954ab1f9c472e26506a99c5f8"
    },
    {
        "tokenID": 77809576,
        "name": "Ryder Ripps Bored Ape Yacht Club",
        "imageURL": "https://lh3.googleusercontent.com/RTvkOSzBsTG0E54t8g4MyXTxETwoIy-91kYLIogGPZx05TX751dRAB7AOSrS74t5Yykay8LuCzy4Ep9UsTaOotYr5lBvpu_oEGoe",
        "contractAddress": "0x15545614507f46d954ab1f9c472e26506a99c5f8"
    },
]

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const DashboardMid = ({
    currentDashboard,
}) => {
    const currentDashboardList = currentDashboard.replace(/'/g, "\"");
    // console.log(currentDashboardList);
    // console.log("isJsonSTRING: " + isJsonString(currentDashboardList));
    const dashboard = JSON.parse(currentDashboardList);

    return (
        <Box
            height={'350px'}
            bg={'rgba(255, 255, 255, 0.6)'}
            borderRadius={'6px'}
            px={'18px'}
            py={'15px'}
            alignItems={'baseline'}
            display={'in-line grid'}>
            {
                <Grid
                    justifyContent={'center'}
                    display={'grid'}
                    gap={6}
                    gridAutoFlow={'column'}
                >
                    {
                        dashboard.map((nftItem, i) => {
                            return (
                                <Image
                                    //awaiting for the NFT verified symbol to showcase within the dashboard. 
                                    key={i}
                                    cursor={'pointer'}
                                    src={nftItem.imageURL}
                                    fit={'cover'}
                                    overflow={'hidden'}
                                    borderRadius={'6px'}
                                    height={'310px'}
                                    boxShadow={'outline'}>
                                </Image>
                            )
                        })
                    }
                </Grid>
            }
        </Box>
    );
};

export default DashboardMid;