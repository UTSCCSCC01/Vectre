import React from "react"
import {
   useBoolean,
   Image
} from "@chakra-ui/react"
import { TOAST_STATUSES } from "../../../redux/constants/global";
import { showToast } from "../../../redux/actions/global";
import { useDispatch } from "react-redux";

const NFTImage = ({
   handleSelectAdd,
   handleSelectDelete,
   selectedList,
   setSelectedList,
   nftItem,
   maxSelected
}) => {
   var [selected, setSelected] = useBoolean();
   const dispatch = useDispatch();

   return (
      <Image
         cursor={'pointer'}
         src={nftItem.imageURL}
         fit={'cover'}
         overflow={'hidden'}
         borderRadius={'6px'}
         width={'200px'}
         height={'200px'}
         border={selected ? '5px var(--chakra-colors-primary-400) solid' : '2px rgba(200, 200, 200, 0.6) solid'}
         onClick={() => {
            if (selectedList.length < maxSelected || (selectedList.length === maxSelected && selected === true)) {
               setSelected.toggle();
               if (!selected === true) {
                  handleSelectAdd(selectedList, nftItem, setSelectedList);
               }
               else {
                  handleSelectDelete(selectedList, nftItem, setSelectedList);
               }
            }
            if (selectedList.length === maxSelected && selected === false) {
               if (maxSelected > 1) {
                  dispatch(showToast(TOAST_STATUSES.ERROR, "Select a maximum of " + maxSelected + " NFTs"));
               }
               else {
                  dispatch(showToast(TOAST_STATUSES.ERROR, "Please select only one NFT"));
               }
            }
         }}
      />
   )
}

export default NFTImage;