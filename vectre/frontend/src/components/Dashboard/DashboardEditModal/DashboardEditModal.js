import React, { useEffect, useState } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Grid,
    Box,
} from "@chakra-ui/react"

import { useDispatch, useSelector } from 'react-redux';
import { loggedInUserSelector, nftSelector } from '../../../redux/selectors/users';

import { BsFillCheckCircleFill } from 'react-icons/bs';
import { BiSelectMultiple } from 'react-icons/bi';

import NFTImage from "../NFTImage/NFTImage";
import { getNFT, updateDashboard } from "../../../redux/actions/users";

const nft_preset = [
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
    {
        "tokenID": 77809539,
        "name": "Ryder Ripps Bored Ape Yacht Club",
        "imageURL": "https://lh3.googleusercontent.com/NSz9FI5eW9ciBu-okuLtG1w5wE61hiSASsnA_-u_eZb6668tfNbLg8caUGdPTzQXxdLfwUyZipfSde5rqdj0YHHkiswvzBn0m7BN",
        "contractAddress": "0x15545614507f46d954ab1f9c472e26506a99c5f8"
    },
    {
        "tokenID": 77809504,
        "name": "Ryder Ripps Bored Ape Yacht Club",
        "imageURL": "https://lh3.googleusercontent.com/BjMjtBR-QUXUQltlSmw3tq6rWgCqxxOLWwCtRNwnF5AkUDVCnPAwFiUFS8I7i1j1EWC81kQmEaO4rH_rtFAvi5W3aYxNfmiDQNzE",
        "contractAddress": "0x15545614507f46d954ab1f9c472e26506a99c5f8"
    },
    {
        "tokenID": 77809251,
        "name": "Ryder Ripps Bored Ape Yacht Club",
        "imageURL": "https://lh3.googleusercontent.com/l3FDHfAh66oG2xgzf2lCOjXvlFlrYfQfZJupUCRDNe3b55DXSzGWBljcbFBnGCt2VjO4NidJSTim-sbrKOeoAr1vT6ymf-BOMSHiA1k",
        "contractAddress": "0x15545614507f46d954ab1f9c472e26506a99c5f8"
    },
    {
        "tokenID": 59985336,
        "name": "HunterHound",
        "imageURL": "https://lh3.googleusercontent.com/Gd7PJCgHReE3kByOi58JT1G5WmkQw4X4dAHQ529greIDzqytit4fpmoD0mEF-QhqpFsnc0Y9zmt-guOw8uoQSbKxsGnZG9An95pg-1Q",
        "contractAddress": "0xc5276f922ba2eab2da008c5cc79cf5fef278c66d"
    },
    {
        "tokenID": 59985333,
        "name": "HunterHound",
        "imageURL": "https://lh3.googleusercontent.com/_B6TyLkVtAy2MH4QvkVa9Um-3hMq4IQsnso3rOriJ7peaKvOrHMoYrI4ONo7pb5rzcJNxgY8as3je4lIjoROwZFc60V2d0lNWqXYoA",
        "contractAddress": "0xc5276f922ba2eab2da008c5cc79cf5fef278c66d"
    },
    {
        "tokenID": 59985331,
        "name": "HunterHound",
        "imageURL": "https://lh3.googleusercontent.com/CtsLLfXRjfGZaFzXdNMEZjAX2GkcQjQopf7rt6SJvY3OkWHptdF7vs6FROUwF86Ar6gy-XpyeTeH5LGfxIF3Zif2LD6xKnKxP7bB",
        "contractAddress": "0xc5276f922ba2eab2da008c5cc79cf5fef278c66d"
    },
    {
        "tokenID": 59985330,
        "name": "HunterHound",
        "imageURL": "https://lh3.googleusercontent.com/GWrCZd6G-knqskeeC8xF0kSc7HQ8YVuoopyxo2TRzuRyQcUCa0hsTXHdol7sjwPN_EQLXuRvgs98E_PrG6oOHp_D9wQ7c7hDqeZ5uA",
        "contractAddress": "0xc5276f922ba2eab2da008c5cc79cf5fef278c66d"
    },
    {
        "tokenID": 59985329,
        "name": "HunterHound",
        "imageURL": "https://lh3.googleusercontent.com/pSQB_JQ4zH98EGBcMjHI_n5XU_wxowskpIDEIbEKtpB1Y-WBe8F-SS9oKDo1gwUl3QjDIBzFczpVVNObwwrahg29HY-XdhkWgHat0A",
        "contractAddress": "0xc5276f922ba2eab2da008c5cc79cf5fef278c66d"
    },
    {
        "tokenID": 59985328,
        "name": "HunterHound",
        "imageURL": "https://lh3.googleusercontent.com/p0OZRFpnbB4i7fBSFiVlW439j4T9Al5rakxDhKCDl8RAcyidNaBaHDJruSYkxgtMfWmrvpRIcXVAjZO-LkeItPT-Xenoy0fjUHckig",
        "contractAddress": "0xc5276f922ba2eab2da008c5cc79cf5fef278c66d"
    },
    {
        "tokenID": 59985327,
        "name": "HunterHound",
        "imageURL": "https://lh3.googleusercontent.com/KALCh8BXARasGudTo-UtlqthXQ4LMyxdfC4MxG3BxpLqY2Z7RLcvn7MObYX2DT-yekmAWKNuNerBststWQenCyxKWSzMLJV8nQ3AKls",
        "contractAddress": "0xc5276f922ba2eab2da008c5cc79cf5fef278c66d"
    },
    {
        "tokenID": 59985324,
        "name": "HunterHound",
        "imageURL": "https://lh3.googleusercontent.com/b4gTLDR9NoIolbFT4KLuZuwecHDD151x9uOnrV2hyQOhPztwLrIcIVoa3umxa9qliKL9SdshJ404tRkNUQQOI2W12EXbB_ojpSu6",
        "contractAddress": "0xc5276f922ba2eab2da008c5cc79cf5fef278c66d"
    }
]

function handleSelectDelete(selectedList, nftItem, setSelectedList) {
    var newSelectedList = [];
    selectedList.map((element) => {
        if (element !== nftItem) {
            newSelectedList.push(element);
        }
    })
    setSelectedList(newSelectedList)
    console.log(selectedList);
}

function handleSelectAdd(selectedList, nftItem, setSelectedList) {

    if (!selectedList.some(item => item.tokenID == nftItem.tokenID)) {
        selectedList.push(nftItem);
    }

    // var contains = false;
    // selectedList.map((element) => {
    //     if (element === nftItem) {
    //         contains = true;
    //     }
    // })
    // if (!contains) setSelectedList(selectedList.push(nftItem))

    console.log(selectedList);
}

function DashboardEditModal({
    isOpen,
    onClose
}) {
    const [scrollBehavior] = React.useState('inside')
    const [selectedList, setSelectedList] = useState([]);
    const dispatch = useDispatch()
    const loggedInUser = useSelector(loggedInUserSelector);

    useEffect(() => {
        dispatch(getNFT(loggedInUser.walletAddress))
    }, [loggedInUser])

    const nft = useSelector(nftSelector);

    return (
        <>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                scrollBehavior={scrollBehavior}
                size={'2xl'}
                bg={'black'}
                color={'black'}
            >
                <ModalOverlay
                    backdropFilter='blur(12px)'
                    backdropBrightness='100%'
                    backgroundColor='rgba(255, 255, 255, 0.3)' />
                <ModalContent
                    bg={'rgba(255, 255, 255, 0.4)'}
                >
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'center'}>
                            <Button
                                display={{ base: 'none', lg: 'inline-flex' }}
                                px={'17.5px'}
                                marginTop={'8px'}
                                marginBottom={'15px'}
                                py={'20px'}
                                fontSize={'19px'}
                                fontWeight={700}
                                alignSelf={'center'}
                                _hover={{ textDecoration: "none" }}
                                alignItems={'center'}
                                rightIcon={<BiSelectMultiple />}
                                color={'primary.400'}
                                bg={'white'}
                                _focus={{ outline: 0 }}>
                                Select NFTs Below
                            </Button>
                        </Flex>
                        <Flex flexDirection={'row'} alignContent={'left'} justifyContent={'left'}>
                            <Button
                                display={{ base: 'none', lg: 'inline-flex' }}
                                marginTop={'2px'}
                                marginBottom={'12px'}
                                fontSize={'14px'}
                                fontWeight={700}
                                alignSelf={'center'}
                                _hover={{ textDecoration: "none" }}
                                alignItems={'center'}
                                color={'grey'}
                                bg={'white'}
                                _focus={{ outline: 0 }}>
                                Select Up to 3 NFTs for the Dashboard!
                            </Button>
                        </Flex>
                        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                            {
                                nft.map((nftItem, i) => {
                                    return (
                                        <Box
                                            key={i}>
                                            <NFTImage
                                                handleSelectDelete={handleSelectDelete}
                                                handleSelectAdd={handleSelectAdd}
                                                selectedList={selectedList}
                                                setSelectedList={setSelectedList}
                                                nftItem={nftItem}
                                            />
                                        </Box>
                                    )
                                })
                            }
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={(e) => {
                                if (selectedList.length > 0) {
                                    const dashboard = JSON.stringify(selectedList).replace(/"/g, "'");
                                    dispatch(updateDashboard(loggedInUser.walletAddress, dashboard))
                                    onClose();
                                } else {
                                    console.log("Unable to Update Dashboard [EditModal]");
                                }
                                e.stopPropagation();
                            }}
                            bg={'primary.400'}
                            color={'white'}
                            _hover={{ textDecoration: "none" }}
                            rightIcon={<BsFillCheckCircleFill />}
                            fontSize={'18px'}>
                            Select Chosen NFTs
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DashboardEditModal;
