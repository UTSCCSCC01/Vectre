import {
    Box,
    Flex,
    Image,
    Button,
    Link,
    Grid
} from '@chakra-ui/react';

import { useBoolean } from '@chakra-ui/react'
import { ReactComponent as VerifiedIcon } from '../../../assets/icons/verified-icon.svg';
import { RiDashboard2Line } from 'react-icons/ri'
import TextButton from '../../Buttons/TextButton/TextButton'
import { MdAirlineSeatFlatAngled } from 'react-icons/md';

const dashboard = [
    {
        "token_id": 54200800,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/HKXYcDwOb3mitLFHXVfbC-2b1_WaXy3DLpl2vqpCCxAo23fpXQ_1mdXJ8_xUf1N3eMzmU-bS7lC-yIn0ZJYuANtPn7m1v0ZkS0uIqQ",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200799,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/mE3CiaiZsohMSzkHR4aMrWnT2oUJAl80ozHoTo8g0fbGsu2_wuv91ZdC8jMluBtxhWRBzBf0p4_OP21RCZ9hj4njCO46wdp5NzV68w",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200798,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/71GihAmlp9yGNFKoFrR15XOEQgArIt4Ad4nu1EPWzyzhowZFJztF9pSV5BnN4CrNxT3FuMtBzIbjkPwopakvOj73nLbAO659jk6WDw",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    }
]

//Create each image as a boolean value that toggles.
//Create a boolean for each nft (nft.length) and toggles between each image.
//At the end find all trues and add each of nft of that particular index into a list of json object called dashboard_final.
//Set dashboard = dashboard_final and update the dashboard middle component. 

//Create a new pop up with a grid of each of the nfts and allow it to scroll instead of having to deal w pagination.
//Set the DashboardMid as a set collection of NFTs that have previously been set on the dashboard. 
//Create a boolean mapping 1-1 to each index of the json object holding all nfts. OR append particular NFT into dashboard_final if selected and remove if deselected
//Then later update and the final_dashboard and refresh. 

// const [flag, setFlag] = useBoolean()

const DashboardMid = ({
    item,
}) => {
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
                gridAutoFlow={'column'}                                  //How to make it so that the NFTs display horizontally.
                >                  
                {
                    dashboard.map((nft_item, i) => {
                        return (
                            <Image
                                key={i}         // need key here, its just a react map thing
                                cursor={'pointer'}
                                src={nft_item.image_url}
                                fit={'cover'}
                                overflow={'hidden'}
                                borderRadius={'6px'}
                                height={'310px'}            //awaiting for the NFT verified symbol to showcase within the dashboard. 
                                boxShadow={'outline'}>  
                            </Image>
                        )
                    })
                }
                </Grid> 
            }
            {/* <Grid templateColumns={'repeat(5, 1fr)'} gap={6} a>
                {
                    dashboard.map((nft_item, i) => {
                        return (
                            <Image
                                cursor={'pointer'}
                                //onClick={onSelect}
                                src={nft_item.image_url}
                                fit={'cover'}
                                overflow={'hidden'}
                                borderRadius={'6px'}
                                height={'310px'}            //awaiting for the NFT verified symbol to showcase within the dashboard. 
                                boxShadow={'outline'}>  
                            </Image>
                        )
                    })
                }
            </Grid>     */}
            {/* <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                {
                    nft.map((nft_item, i) => {
                        return (
                            <Image
                                cursor={'pointer'}
                                //onClick={onSelect}                    THIS FOR THE WHOLE DASHBOARD SELECTION TOOL.
                                src={nft_item.image_url}
                                fit={'cover'}
                                overflow={'hidden'}
                                borderRadius={'6px'}
                                height={'150px'}
                                width={'150px'} />
                        )
                    })
                }
            </Grid> */}
            {/* <Button
            display={{ base: 'none', lg: 'inline-flex' }}
            px={'30px'}
            fontSize={'18px'}
            fontWeight={700}
            color={'white'}
            bg={'primary.400'}
            _focus={{ outline: 0 }}> 
            Add NFTs
         </Button> */}
        </Box>
    );
};

export default DashboardMid;