import {
    Container,
    Grid,
    GridItem,
    Stack, 
    Icon, 
    Image, 
    useDisclosure, 
    Box
} from '@chakra-ui/react'
import ButtonLinkWrapper from '../Buttons/ButtonLinkWrapper/ButtonLinkWrapper';
import CommunityButton from '../Buttons/CommunityButton/CommunityButton';
import TextButton from '../Buttons/TextButton/TextButton';
import {IoIosPeople} from 'react-icons/io'; 
import {BsFillArrowRightCircleFill} from 'react-icons/bs';
import PersonalCommunityModal from '../Modals/PersonalCommunityModal/PersonalCommunityModal';
import {getAvatarOrDefault} from "../../utils/Utils";

const ContentWithCommunityButtons = ({
    sideButtonsList,
    ...otherProps
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const someButtons = sideButtonsList.slice(0, 5);;
    return (
        <Container
            maxW={'8xl'}
            py={'60px'}
            margin={'0 auto'}>
            <Grid
                gridTemplateColumns={{ base: "", lg: '12vw auto 12vw' }}
                columnGap={'30px'}>
                <GridItem>
                    <Stack gap={'15px'}>
                        <ButtonLinkWrapper href={""}>
                            <TextButton
                                width={'100%'}
                                px={'17.5px'}
                                fontSize={'18px'}
                                fontWeight={700}
                                text={"My Communities"}
                                rightIcon={<IoIosPeople px={'18px'}/>} />
                        </ButtonLinkWrapper>
                        {someButtons.map((btn, i) =>
                                <ButtonLinkWrapper href={"/c/" + btn.communityID}>
                                    <CommunityButton
                                            width={'100%'}
                                            px={'17.5px'}
                                            fontSize={'18px'}
                                            fontWeight={200}
                                            text={btn.communityID}
                                            imgSrc={getAvatarOrDefault(btn.profilePic)}/>
                                </ButtonLinkWrapper>
                        )}
                        <Box onClick={onOpen}>
                            <TextButton
                                width={'100%'}
                                px={'17.5px'}
                                fontSize={'18px'}
                                fontWeight={700}
                                text={"View More"}
                                leftIcon={<BsFillArrowRightCircleFill px={'18px'} />} 
                                />
                        </Box>
                        <PersonalCommunityModal isOpen={isOpen} onClose={onClose} communitiesList={sideButtonsList}/>
                    </Stack>
                </GridItem>
                <GridItem>
                    {otherProps.children}
                </GridItem>
            </Grid>
        </Container>
    );
};

export default ContentWithCommunityButtons;