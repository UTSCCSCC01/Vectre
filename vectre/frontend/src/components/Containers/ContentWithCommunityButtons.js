import {
    Container,
    Grid,
    GridItem,
    Stack,
    useDisclosure,
    Box
} from '@chakra-ui/react'
import ButtonLinkWrapper from '../Buttons/ButtonLinkWrapper/ButtonLinkWrapper';
import TextButton from '../Buttons/TextButton/TextButton';
import { IoIosPeople } from 'react-icons/io';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import PersonalCommunityModal from '../Modals/PersonalCommunityModal/PersonalCommunityModal';
import { cutText, getAvatarOrDefault } from "../../utils/Utils";

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
                        <TextButton
                            width={'100%'}
                            px={'17.5px'}
                            fontSize={'18px'}
                            fontWeight={700}
                            text={"My Communities"}
                            rightIcon={<IoIosPeople size={'1.3rem'} />} />
                        {someButtons.map((btn, i) =>
                            <ButtonLinkWrapper href={"/c/" + btn.communityID}>
                                <TextButton
                                    justifyContent={'flex-start'}
                                    gap={'8px'}
                                    width={'100%'}
                                    px={'17.5px'}
                                    fontSize={'18px'}
                                    fontWeight={400}
                                    text={"<" + cutText(btn.communityID, 10) + ">"}
                                    imgSrc={getAvatarOrDefault(btn.profilePic)}
                                />
                            </ButtonLinkWrapper>
                        )}
                        <Box onClick={onOpen}>
                            <TextButton
                                justifyContent={'flex-start'}
                                gap={'8px'}
                                width={'100%'}
                                px={'17.5px'}
                                fontSize={'18px'}
                                fontWeight={400}
                                text={"View More"}
                                leftIcon={<BsFillArrowRightCircleFill size={'1.3rem'} />}
                            />
                        </Box>
                        <PersonalCommunityModal isOpen={isOpen} onClose={onClose} communitiesList={sideButtonsList} />
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