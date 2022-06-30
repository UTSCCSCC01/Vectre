import React from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    RadioGroup,
    Stack,
    Button,
    Radio,
    Grid,
    Image,
} from "@chakra-ui/react"

const nft = [
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
    },
    {
        "token_id": 54200797,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/RYlYnnkV6D1-jc7Gp97pFeKZCWjMQCdAhg7HYTVZgDctRJ6viMgzfhQrgUIrvUgvU5btrFXpeS-GkA6MJmoUMiz6f_R0I83jP8cpGnM",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200794,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/uTLYY0xM11gM8R701J8vXf5RtxepiYy1mW6QD07peMnP2HOaG_HpYc2qUeY9yFgDVjvM9phnMkh9X__a4j3n-X_G8RUI9O5x54e0-iw",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200792,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/o492_NHwuZOvcnA-Ze8YunmBrltTCAddZ09lE0zsDVA6BPhqxIA_h2cBojC25U7P3Gz1mDC0k-ejX2bHeBpzEkMUOILXabQt85rk",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200789,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/N5IDPTj8n4WcMAOSLdwk35qfDFbLIsbGo-znfklW4WvdxaGam5m2hKKhzsG1wzUbea3EGuFKKFUbEg8D_TUDI5nuxYmIi7aqIFB9UA",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200786,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/HfOEXVjMWrpVYRFhvxp_BHwyjHaq8no59VlyBbQMk8_hlyEjYVXhonyKU5-oI6L_JiUF7BtPgi6OBT35-LXTOy5VHyumeqqTBKUQfA",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200783,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/-MYDCb1hMvF2ISgYyZnrDxyMoGuFpKSTGHQDysuOzeGidQLCeAWHeriBSEK--aVY8ntXwzWG-ewdRZwaMfcAxmsPoGZ4tJ3IW12KWw",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200780,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/mpJPU4G8L5gGKHLBnRB9kcyL8drjbqF9Uuh4GYDuvhijLbof6TteqdZ3d2OU8P_2pW9aqOqn3vi8M6KgA--wQ6JkkZjaHIT6i3TpaJg",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200778,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/WsE-F23ppZwkYfNRT374pc4qV8dP-Ft5dD_qrwzCwr4bIuzzNTlmQNn1Xe-p0QcXzJ0e0__OhBiSUQ8STfVIojsBbVMAZpCoVUh3CA",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200775,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/TolCKc-NuC9828JPSlPkOFKxnkJ7yLdyHFyic3Yo9-RHeHuiROqXd-7SP1Tj7vRYf8AxnVf1SNjfGH5hf0Gotjj_as-o5ilp1jM3pg",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200769,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/NqpjSV3KHbVoPsr9vuNAfoWsgH0KXHUXbEAcv_1_sDTpRg983VG97clF-b1tkYg0P3NQP2cF-zRrwaeYU9Tly8-FWXvrewNUCrvcWA",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200766,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/N1jic99ddjCxQmanfNZcS-6nKLgiQwHdZiotV-jZz-Y_4EtZ9mvN0SykheZK4Wppc9693xjerx3-uW6Vs2o5PAuBoff9lptK4MlP",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200764,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/_nQuY4sAKzeDYSp5iVcQ4dw-meOcGoRNeviNyf06mYJp-EYiTviUZw1ohUkaX3sF6GlwfDay3X0eze8VX50bsYpL4856xVCACHclpQ",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200761,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/bjGUQc4vIThbWbXqTIWLSnV3hE95C_o4wDuZaEkEkat4yZ6ef0DssH-fbb9zAK7vF03_G9o9KKHmwqdGtI461_vWOYTCQefqnQlgoTY",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200758,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/bJyGyJ_qydileQ7-Ewear_jbELWn3FhkZMs0y1A8BfvWmUhnlwAdW9WZl1TORvCpVcfsoOrduGD9Sq0NXqndnWGWn0tbzM7Vf2qJ",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200754,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/fAomLt5nOK-B8UAAFHVTjUV5ITWdwNCxFGEkrVn-MwYWOeN-DqGcj5PG5zqDDf5Ze1xLA-FC9jfsUQsxaZBwEjKhD2zy-mLoL_zdcac",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200751,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/ITiixeKRsnpOiFWOVTsN8LckdYDf1IvB7eF1KbTF6N-n1U3MAz9sa6SWTjE-WkR5NhrmdpLVNc9c-bnlJ9qFMTI-avhc9LOKki66NQ",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    },
    {
        "token_id": 54200748,
        "name": "Kibo's collection #5",
        "image_url": "https://lh3.googleusercontent.com/hvkNPZ4-ZLp580UVSFQ42v_gQhmF5DUd2VACMYp-_xHHJTmo8PvxWUgWqyja2Xffop2KKMWpwGQAt5VyR1hlJJlAGpo2fGAKx6dzC9A",
        "contract_address": "0xfc89fabb00a3cbfaf8344697c358ff8d52787b2d"
    }
]

function DashboardEditModal({
    isOpen,
    onClose
}) {
    const [scrollBehavior, setScrollBehavior] = React.useState('inside')

    return (
        <>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                scrollBehavior={scrollBehavior}
                size={'2xl'}          
            >
                <ModalOverlay 
                />
                <ModalContent
                >
                    <ModalHeader>NFT Dashboard Selector</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                    
                        >
                            
                        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                            {
                                nft.map((nft_item, i) => {
                                    return (
                                        <Image
                                            key={i}         // need key here, its just a react map thing
                                            cursor={'pointer'}
                                            src={nft_item.image_url}
                                            fit={'cover'}
                                            overflow={'hidden'}
                                            borderRadius={'6px'}
                                            width={'200px'}
                                            height={'200px'}            //awaiting for the NFT verified symbol to showcase within the dashboard. 
                                            boxShadow={'outline'}>
                                        </Image>
                                    )
                                })
                            }
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            onClick={onClose}>
                            Select Chosen NFTs
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DashboardEditModal;
