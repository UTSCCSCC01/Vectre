import {
    Image,
    IconButton
} from "@chakra-ui/react"
import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { getBannerOrDefault } from "../../../../utils/Utils";

const Banner = ({
    data,
    bannerImageData,
    setBannerImageData
}) => {

    const bannerHiddenFileInput = React.useRef(null);

    const bannerHandleUploadClick = () => {
        bannerHiddenFileInput.current.click();
    };
    const bannerHandleChange = (event) => {
        setBannerImageData(document.getElementById("bannerImageInput").files[0]);
    };

    return (
        <>
            <Image
                src={bannerImageData ? URL.createObjectURL(bannerImageData) : getBannerOrDefault(data.banner)}
                fit={'cover'}
                overflow={'hidden'}
                borderRadius={'6px'}
                height={'200px'} />
            <IconButton
                _focus={{ outline: 0 }}
                bg={'rgba(35, 52, 71, 0.85)'}
                color={'white'}
                borderRadius={'40px'}
                width={'120px'}
                bottom={'10%'}
                right={'0%'}
                mr={'8px'}
                mb={'5px'}
                position={'absolute'}
                icon={<BsFillPencilFill size={'1.5rem'} />}
                onClick={bannerHandleUploadClick}
            />
            <input
                type="file"
                name="image"
                id="bannerImageInput"
                accept="image/png, image/jpeg"
                ref={bannerHiddenFileInput}
                onChange={bannerHandleChange}
                style={{ display: 'none' }} />
        </>
    )
}

export default Banner;