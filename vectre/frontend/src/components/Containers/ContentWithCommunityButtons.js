import {
    Container,
    Grid,
    GridItem,
    Stack,
    useDisclosure
} from '@chakra-ui/react'
import TextButton from '../Buttons/TextButton/TextButton';
import { IoIosPeople } from 'react-icons/io';
import PersonalCommunityModal from '../Modals/PersonalCommunityModal/PersonalCommunityModal';
import CommunityProfileEditModal from '../Modals/CommunityProfileEditModal/CommunityProfileEditModal';

const ContentWithCommunityButtons = ({
    sideButtonsList,
    ...otherProps
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { isOpen: createCommunityIsOpen, onClose: createCommunityOnClose, onOpen: createCommunityOnOpen } = useDisclosure();
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
                            rightIcon={<IoIosPeople size={'1.3rem'} />}
                            onClick={onOpen} />
                        <PersonalCommunityModal isOpen={isOpen} onClose={onClose} communitiesList={sideButtonsList} />
                        <TextButton
                            width={'100%'}
                            px={'17.5px'}
                            fontSize={'18px'}
                            fontWeight={700}
                            text={"Create a Community"}
                            onClick={createCommunityOnOpen} />
                        <CommunityProfileEditModal communityData={{}} isOpen={createCommunityIsOpen} onClose={createCommunityOnClose} isEdit={false} />
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