import {
    Modal,
    ModalOverlay,
    ModalContent,
    Image, 
    Box, 
    Heading,
    Button,
    ModalFooter
} from "@chakra-ui/react";
import {IoIosPeople} from 'react-icons/io'; 
import TextButton from "../../Buttons/TextButton/TextButton";
import EntityCard from "../../EntityCard/EntityCard";

const PersonalCommunityModal = ({
    isOpen,
    onClose,
    communitiesList, 
}) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                position={'absolute'}
                py={'16px'}
                px={'13px'}
                padding={'20px'}
                isCentered>
                <ModalOverlay
                    bg={'rgba(255, 255, 255, 0.01)'}
                    backdropFilter='blur(20px)'
                />
                <ModalContent
                    height={'500px'}
                    width={'500px'}
                    alignItems={'left'}>
                    <TextButton bg={'none'} 
                        _hover={'none'} 
                        _click={'none'} 
                        rightIcon={<IoIosPeople/>} 
                        text={'My Communities'} fontSize={'20px'}/>
                    {communitiesList.map((community, i) => 
                        <EntityCard Key={community.communityID} primaryText={community.name} 
                        secondaryText={community.communityID} 
                        href={"/c/" + community.communityID}
                        data={{'nice':'nice'}} />
                    )}
                    <ModalFooter>
                        <TextButton text={'View More'}/>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default PersonalCommunityModal;