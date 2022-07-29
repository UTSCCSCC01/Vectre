import {
    Container,
    Grid,
    GridItem,
    Stack, 
    Icon, 
    Image
} from '@chakra-ui/react'
import ButtonLinkWrapper from '../Buttons/ButtonLinkWrapper/ButtonLinkWrapper';
import CommunityButton from '../Buttons/CommunityButton/CommunityButton';
import TextButton from '../Buttons/TextButton/TextButton';
import {IoIosPeople} from 'react-icons/io'; 
import {BsFillArrowRightCircleFill} from 'react-icons/bs'; 
import default_profile from "../../assets/images/default_profile_pic.jpg"; 

const ContentWithCommunityButtons = ({
    sideButtonsList,
    ...otherProps
}) => {
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
                        {
                            sideButtonsList.map((btn, i) => {
                                if (btn.hidden) {
                                    return null;
                                }
                                if (btn.link) {
                                    return (
                                        <ButtonLinkWrapper href={""}>
                                            <CommunityButton
                                                width={'100%'}
                                                px={'17.5px'}
                                                fontSize={'18px'}
                                                fontWeight={200}
                                                text={btn.text}
                                                imgSrc={btn.imgSrc}/>
                                        </ButtonLinkWrapper>
                                    ); 
                                }
                                return <CommunityButton
                                    width={'100%'}
                                    key={i}
                                    px={'17.5px'}
                                    fontSize={'18px'}
                                    fontWeight={700}
                                    text={btn.text}
                                    onClick={() => { btn.func() }} />
                            })
                        }
                        <ButtonLinkWrapper href={""}>
                            <TextButton
                                width={'100%'}
                                px={'17.5px'}
                                fontSize={'18px'}
                                fontWeight={700}
                                text={"View More"}
                                leftIcon={<BsFillArrowRightCircleFill px={'18px'}/>} 
                                leftImage={default_profile}/>
                            
                        </ButtonLinkWrapper>
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