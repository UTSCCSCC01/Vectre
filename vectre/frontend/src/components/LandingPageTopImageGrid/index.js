import {
    Box,
    Image,
    Grid,
    GridItem
} from '@chakra-ui/react';

import nft1 from '../../assets/images/nft-ex1.jpeg';
import nft2 from '../../assets/images/nft-ex2.jpeg';
import nft3 from '../../assets/images/nft-ex3.jpeg';
import nft4 from '../../assets/images/nft-ex4.jpeg';
import nft5 from '../../assets/images/nft-ex5.jpeg';
import decorBox from '../../assets/others/decor-box.svg';

const imageInfos = [
    {
        gcs: 2,
        gce: 3,
        grs: 2,
        gre: 4,
        alt: "nft1",
        src: nft1
    },
    {
        gcs: 1,
        gce: 4,
        grs: 4,
        gre: 6,
        alt: "nft2",
        src: nft2
    },
    {
        gcs: 3,
        gce: 5,
        grs: 1,
        gre: 4,
        alt: "nft3",
        src: nft3
    },
    {
        gcs: 4,
        gce: 6,
        grs: 4,
        gre: 5,
        alt: "nft4",
        src: nft4
    },
    {
        gcs: 5,
        gce: 7,
        grs: 3,
        gre: 4,
        alt: "nft5",
        src: nft5
    },
    {
        gcs: 5,
        gce: 6,
        grs: 1,
        gre: 3,
        alt: "decor-box1",
        src: decorBox
    },
    {
        gcs: 4,
        gce: 5,
        grs: 5,
        gre: 6,
        alt: "decor-box2",
        src: decorBox
    },
]

const LandingPageTopImageGrid = () => {
    return (
        <Box
            flex={1}
            w={'full'}
            height={'fit-content'}
        >
            <Grid
                gridTemplateColumns={"1% 25% 25% 15% 15% 2%"}
                gridTemplateRows={"8% 4% 23% 38% 14%"}
                height={"100%"}
                gridGap={"20px"}
            >
                {imageInfos.map((image, i) => (
                    <GridItem
                        key={i}
                        gridColumnStart={image.gcs}
                        gridColumnEnd={image.gce}
                        gridRowStart={image.grs}
                        gridRowEnd={image.gre}
                        rounded={'10px'}
                        boxShadow={'sm'}
                        overflow={'hidden'}
                        filter={'drop-shadow(0px 30px 60px rgba(25, 55, 102, 0.25))'}
                        transition={'all .2s ease-in-out'}
                        _hover={{ transform: "scale(1.05)" }}>
                        <Image
                            alt={image.alt}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={'100%'}
                            src={image.src}
                        />
                    </GridItem>
                ))}
            </Grid>
        </Box >
    );
}

export default LandingPageTopImageGrid;
