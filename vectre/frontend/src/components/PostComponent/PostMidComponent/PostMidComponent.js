import {
    Stack,
    Flex,
    Image
} from '@chakra-ui/react';

import RepostComponent from '../RepostComponent/RepostComponent';

const sampleRepostData = {
    timestamp: "1:43 PM · May 9, 2022",
    text: "Saw a dragon today. Wow!",
    author: {
        walletAddress: "0x15f209074682937c58ca031ebb43d64fa98d97b8",
        username: "Deadly Dwarf",
        profilePic: "https://www.cheatsheet.com/wp-content/uploads/2016/11/tyrion-tywin-1024x683.jpg",
        verified: true
    },
    like: "4.2k",
    comment: "420",
    community: "GOT",
    imageURL: "https://api.time.com/wp-content/uploads/2016/05/tyrion-game-of-thrones-peter-dinklage.jpeg",
    edited: false
}

const PostMidComponent = ({
    item,
    onOpen
}) => {
    return (
        <>
            <Flex
                display={item.text ? 'inline-flex' : 'none'}
                px={'13px'}
                py={'11px'}
                fontSize={'18px'}
                fontWeight={700}
                color={'brand.400'}
                bg={'rgba(255, 255, 255, 0.7)'}
                borderRadius={'6px'}
                alignItems={'center'}>
                {item.text}
            </Flex>
            {
                item.repost ? (
                    <Stack
                        display={'inline-flex'}>
                        <RepostComponent item={sampleRepostData} />
                    </Stack>
                ) : (
                    <Stack
                        display={item.imageURL ? 'inline-flex' : 'none'}>
                        <Image
                            cursor={'pointer'}
                            onClick={onOpen}
                            src={item.imageURL}
                            fit={'cover'}
                            overflow={'hidden'}
                            borderRadius={'6px'}
                            height={'250px'} />
                    </Stack>
                )
            }
        </>
    );
};

export default PostMidComponent;