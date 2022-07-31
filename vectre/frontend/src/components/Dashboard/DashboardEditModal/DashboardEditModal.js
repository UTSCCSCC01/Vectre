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

function handleSelectDelete(selectedList, nftItem, setSelectedList) {
    var newSelectedList = [];
    selectedList.map((element) => {
        if (element == nftItem) {
        }
        else {
            newSelectedList.push(element);
        }
    })
    setSelectedList(newSelectedList)
}

function handleSelectAdd(selectedList, nftItem, setSelectedList) {

    var newSelectedList = []
    var contains = false;

    if (selectedList.length == 0) {
        newSelectedList.push(nftItem);
        setSelectedList(newSelectedList);
        return;
    }

    selectedList.map((element) => {
        if (element == nftItem) {
            contains = true;
        }
        else {
            newSelectedList.push(element);
        }
    })

    if (contains == false) {
        newSelectedList.push(nftItem);
    }

    setSelectedList(newSelectedList)
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

    const nftList = useSelector(nftSelector);
    var nftListNew = '';
    if (nftList.length !== 0) {
        nftListNew = nftList;
    }
    const nft = nftListNew;

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
                        {nft.length !== 0 ?
                            <>
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
                                                        maxSelected={3}
                                                    />
                                                </Box>
                                            )
                                        })
                                    }
                                </Grid>
                            </> :
                            <Flex flexDirection={'row'} alignContent={'center'} justifyContent={'center'}>
                                <Button
                                    display={{ base: 'none', lg: 'inline-flex' }}
                                    marginTop={'150px'}
                                    marginBottom={'150px'}
                                    fontSize={'18px'}
                                    fontWeight={700}
                                    alignSelf={'center'}
                                    _hover={{ textDecoration: "none" }}
                                    alignItems={'center'}
                                    color={'primary.400'}
                                    bg={'white'}
                                    _focus={{ outline: 0 }}>
                                    No NFTs found! :(
                                </Button>
                            </Flex>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={(e) => {
                                if (selectedList.length === 0) {
                                    const dashboard = JSON.stringify(selectedList)
                                    dispatch(updateDashboard(loggedInUser.walletAddress, dashboard, () => { setSelectedList([]) }))
                                    onClose();
                                }
                                else if (selectedList.length > 0) {
                                    const dashboard = JSON.stringify(selectedList).replace(/"/g, "'");
                                    dispatch(updateDashboard(loggedInUser.walletAddress, dashboard, () => { setSelectedList([]) }))
                                    onClose();
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
