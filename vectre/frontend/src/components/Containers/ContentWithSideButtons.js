import {
    Container,
    Grid,
    GridItem,
    Stack
} from '@chakra-ui/react'
import ButtonLinkWrapper from '../Buttons/ButtonLinkWrapper/ButtonLinkWrapper';
import TextButton from '../Buttons/TextButton/TextButton';

const ContentWithSideButtons = ({
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
                        {
                            sideButtonsList.map((btn, i) => {
                                if (btn.hidden) {
                                    return null;
                                }
                                if (btn.link) {
                                    return (
                                        <ButtonLinkWrapper href={btn.link} key={i}>
                                            <TextButton
                                                width={'100%'}
                                                px={'17.5px'}
                                                fontSize={'18px'}
                                                fontWeight={700}
                                                text={btn.text} />
                                        </ButtonLinkWrapper>
                                    )
                                }
                                return <TextButton
                                    width={'100%'}
                                    key={i}
                                    px={'17.5px'}
                                    fontSize={'18px'}
                                    fontWeight={700}
                                    text={btn.text}
                                    onClick={() => { btn.func() }} />
                            })
                        }
                    </Stack>
                </GridItem>
                <GridItem>
                    {otherProps.children}
                </GridItem>
            </Grid>
        </Container>
    );
};

export default ContentWithSideButtons;