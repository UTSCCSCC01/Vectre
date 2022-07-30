import {
    Box,
    Container,
    Grid,
    GridItem,
    Stack
} from '@chakra-ui/react'
import ButtonLinkWrapper from '../Buttons/ButtonLinkWrapper/ButtonLinkWrapper';
import TextButton from '../Buttons/TextButton/TextButton';

const ContentWithSideButtons = ({
    headerShow,
    headerText,
    headerIcon,
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
                        <TextButton
                            display={headerShow ? 'inline-flex' : 'none'}
                            fontSize={'18px'}
                            fontWeight={700}
                            text={headerText}
                            rightIcon={headerIcon}
                            cursor={'default'}
                            _hover={{ bg: "white" }}
                            _active={{ bg: "white" }}
                        />
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
                                                fontSize={'16px'}
                                                fontWeight={500}
                                                text={btn.text} />
                                        </ButtonLinkWrapper>
                                    )
                                }
                                return <TextButton
                                    key={i}
                                    width={'100%'}
                                    fontSize={'18px'}
                                    fontWeight={500}
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